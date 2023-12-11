import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { DepartmentServices } from './academic-department.service'

const handleCreateAcademicDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.createAcademicDepartmentIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is created successfully',
    data: result,
  })
})

const handleGeDepartments = catchAsync(async (req, res) => {
  const result = await DepartmentServices.getAcademicDepartments()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Departments data retrieved successfully',
    data: result,
  })
})

const handleGetSingleDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params
  const result = await DepartmentServices.getSingleDepartment(departmentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department data retrieved successfully',
    data: result,
  })
})

const handleUpdateDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params

  const result = await DepartmentServices.updateDepartment(
    departmentId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department updated successfully !',
    data: result,
  })
})

export const departmentControllers = {
  handleCreateAcademicDepartment,
  handleGeDepartments,
  handleGetSingleDepartment,
  handleUpdateDepartment,
}
