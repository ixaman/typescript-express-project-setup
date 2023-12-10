import config from '../../config'
import AcademicSemester from '../academic-semerter/academic-semester.model'
import { TStudent } from '../student/student.interface'
import Student from '../student/student.model'
import { TUser } from './user.interface'
import User from './user.model'
import { generateStudentId } from './user.utils'

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
    throw new Error('Admission semester not found')
  }

  // generate studentid
  userData.id = await generateStudentId(admissionSemester)

  //create a user
  const newUser = await User.create(userData)

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    payload.id = newUser.id
    payload.user = newUser._id //referenced id

    const newStudent = await Student.create(payload)
    return newStudent
  }
}

export const userServices = {
  createStudentIntoDb,
}
