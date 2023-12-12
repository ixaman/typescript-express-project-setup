import mongoose from 'mongoose'
import Student from './student.model'
import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import User from '../user/user.model'

const getStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const getSingleStudent = async (sId: string) => {
  const result = await Student.findOne({ id: sId })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const deleteStudentFromDB = async (id: string) => {
  //creating an instance of Model student so that it can access instance method isExist()
  const user = new Student()
  const isUserExist = await user.isExist(id)

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !')
  }
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }, //to get the latest data
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
  }
}

export const StudentServices = {
  getStudentsFromDB,
  getSingleStudent,
  deleteStudentFromDB,
}
