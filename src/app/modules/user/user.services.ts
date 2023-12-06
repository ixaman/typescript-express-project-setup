import config from '../../config'
import { TStudent } from '../student/student.interface'
import Student from '../student/student.model'
import { TUser } from './user.interface'
import User from './user.model'

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  //create a new user object
  const user: Partial<TUser> = {}

  //if password not given by user use default password
  user.password = password || (config.default_password as string)

  //set student role
  user.role = 'student'

  //manually generated id for a new user
  user.id = '20301000002'

  //create a user
  const newUser = await User.create(user)

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    studentData.id = newUser.id
    studentData.user = newUser._id //referenced id

    const newStudent = await Student.create(studentData)
    return newStudent
  }
}

export const userServices = {
  createStudentIntoDb,
}
