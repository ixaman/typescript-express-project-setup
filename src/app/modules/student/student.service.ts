import { TStudent } from './student.interface'
import Student from './student.model'

const createStudentIntoDb = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student) //<<--using mongose own static method

  const student = new Student(studentData)

  if (await student.isExist(studentData.id)) {
    throw new Error('User already exist in db')
  }
  const result = student.save()

  return result
}

const getStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudent = async (sId: string) => {
  const result = await Student.findOne({ id: sId })
  return result
}

export const StudentServices = {
  createStudentIntoDb,
  getStudentsFromDB,
  getSingleStudent,
}
