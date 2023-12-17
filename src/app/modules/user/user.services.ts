import httpStatus from 'http-status'
import config from '../../config'
import AppError from '../../error/AppError'
import AcademicSemester from '../academic-semerter/academic-semester.model'
import { TStudent } from '../student/student.interface'
import Student from '../student/student.model'
import { TUser } from './user.interface'
import User from './user.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils'
import mongoose from 'mongoose'
import { TFaculty } from '../faculty/faculty.interface'
import AcademicDepartment from '../academic-department/academic-department.model'
import { FacultyMember } from '../faculty/faculty.model'
import { TAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'

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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'faculty'

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  )

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateFacultyId()

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }) // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a faculty (transaction-2)
    const newFaculty = await FacultyMember.create([payload], { session })

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    await session.commitTransaction()
    await session.endSession()

    return newFaculty
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'admin'

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateAdminId()

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session })

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const userServices = {
  createStudentIntoDb,
  createFacultyIntoDB,
  createAdminIntoDB,
}
