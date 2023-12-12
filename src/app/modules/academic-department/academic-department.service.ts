import { TAcademicDepartment } from './academic-department.interface'
import AcademicDepartment from './academic-department.model'

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload)
  return result
}

const getAcademicDepartments = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty')
  return result
}

const getSingleDepartment = async (payload: string) => {
  const result = await AcademicDepartment.findOne({ _id: payload }).populate(
    'academicFaculty',
  )
  return result
}

const updateDepartment = async (
  departmentId: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const updatedDepartment = await AcademicDepartment.findOneAndUpdate(
    { _id: departmentId },
    payload,
    { new: true },
  )
  return updatedDepartment
}

export const DepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAcademicDepartments,
  getSingleDepartment,
  updateDepartment,
}
