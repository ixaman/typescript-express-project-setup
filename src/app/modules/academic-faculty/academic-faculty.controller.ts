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

const handleGetAcademicFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAcademicFaculties()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties data retrieved successfully',
    data: result,
  })
})

const handleGetSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params
  const result = await FacultyServices.getSingleAcademicFaculty(facultyId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data retrieved successfully',
    data: result,
  })
})

const handleUpdateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params

  const result = await FacultyServices.updateAcademicFaculty(
    facultyId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully !',
    data: result,
  })
})

export const academicFacultyControllers = {
  handleCreateAcademicFaculty,
  handleGetAcademicFaculties,
  handleGetSingleAcademicFaculty,
  handleUpdateAcademicFaculty,
}
