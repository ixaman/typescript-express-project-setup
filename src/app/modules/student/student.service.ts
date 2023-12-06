import Student from './student.model'

const getStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudent = async (sId: string) => {
  const result = await Student.findOne({ id: sId })
  return result
}

export const StudentServices = {
  getStudentsFromDB,
  getSingleStudent,
}
