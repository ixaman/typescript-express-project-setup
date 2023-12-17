import { TAcademicFaculty } from './academic-faculty.interface'
import AcademicFaculty from './academic-faculty.model'

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload)
  return result
}

const getAcademicFaculties = async () => {
  const result = await AcademicFaculty.find()
  return result
}

const getSingleAcademicFaculty = async (payload: string) => {
  const result = await AcademicFaculty.findOne({ _id: payload })
  return result
}

const updateAcademicFaculty = async (
  facultyId: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const updatedFaculty = await AcademicFaculty.findByIdAndUpdate(
    { _id: facultyId },
    payload,
    { new: true },
  )
  return updatedFaculty
}

export const FacultyServices = {
  createAcademicFacultyIntoDB,
  getAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
