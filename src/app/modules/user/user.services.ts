import httpStatus from 'http-status'
import config from '../../config'
import AppError from '../../error/AppError'
import AcademicSemester from '../academic-semerter/academic-semester.model'
import { TStudent } from '../student/student.interface'
import Student from '../student/student.model'
import { TUser } from './user.interface'
import User from './user.model'
import { generateStudentId } from './user.utils'
import mongoose from 'mongoose'

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  //create a new user object
  const userData: Partial<TUser> = {}

  //if password not given by user use default password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'student'

  // get the semester
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  if (!admissionSemester) {
    // Handle the case where admissionSemester is null (perhaps throw an error or handle it accordingly)
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found')
  }

  // generate studentid
  userData.id = await generateStudentId(admissionSemester)

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //create a user do (transaction-1)
    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User')
    }

    //create a student
    if (newUser.length) {
      //set id, _id as user
      payload.id = newUser[0].id
      payload.user = newUser[0]._id //referenced id

      //create a student do (transaction-2)
      const newStudent = await Student.create([payload], { session })

      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student')
      }

      await session.commitTransaction()
      await session.endSession()

      return newStudent
    }
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student')
  }
}

export const userServices = {
  createStudentIntoDb,
}
