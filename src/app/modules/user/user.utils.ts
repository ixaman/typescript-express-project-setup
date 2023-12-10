import { TAcademicSemester } from '../academic-semerter/academic-semester.interface'
import User from './user.model'

const getLastStudent = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()

  return lastStudent?.id ? lastStudent.id : undefined
}

export const generateStudentId = async (payload: TAcademicSemester) => {
  let initialId = (0).toString() //0000

  const lastStudentId = await getLastStudent() //2030010000
  const lastStuentYear = lastStudentId?.substring(0, 4)
  const lastStudentCode = lastStudentId?.substring(4, 6)

  if (
    lastStudentId &&
    lastStuentYear === payload.year &&
    lastStudentCode === payload.code
  ) {
    initialId = lastStudentId.substring(6)
  }

  let incrementedId = (Number(initialId) + 1).toString().padStart(4, '0')

  incrementedId = `${payload.year}${payload.code}${incrementedId}`

  return incrementedId
}
