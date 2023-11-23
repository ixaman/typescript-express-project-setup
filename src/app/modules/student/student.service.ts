import { Student } from './student.interface'
import StudentModel from './student.model'

const createStudentIntoDb = async (student: Student) => {
  const result = await StudentModel.create(student)
  return result
}

const getStudentsFromDB = async () => {
  const result = await StudentModel.find()
  return result
}

const getSingleStudent = async (sId: string) => {
  const result = await StudentModel.findOne({ id: sId })
  return result
}

export const StudentServices = {
  createStudentIntoDb,
  getStudentsFromDB,
  getSingleStudent,
}
