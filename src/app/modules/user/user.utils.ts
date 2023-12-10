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

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}

export const generateStudentId = async (payload: TAcademicSemester) => {
  const initialId = (await getLastStudent()) || (0).toString()
  let incrementedId = (Number(initialId) + 1).toString().padStart(4, '0')

  incrementedId = `${payload.year}${payload.code}${incrementedId}`

  return incrementedId
}
