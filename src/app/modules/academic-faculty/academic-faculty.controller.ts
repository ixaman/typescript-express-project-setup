import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { FacultyServices } from './academic-faculty.service'

const handleCreateAcademicFaculty = catchAsync(async (req, res) => {
  const result = await FacultyServices.createAcademicFacultyIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  })
})

const handleGetFaulties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAcademicFaculties()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties data retrieved successfully',
    data: result,
  })
})

const handleGetSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params
  const result = await FacultyServices.getSingleFaculty(facultyId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data retrieved successfully',
    data: result,
  })
})

const handleUpdateFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params

  const result = await FacultyServices.updateFaculty(facultyId, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully !',
    data: result,
  })
})

export const facultyControllers = {
  handleCreateAcademicFaculty,
  handleGetFaulties,
  handleGetSingleFaculty,
  handleUpdateFaculty,
}
