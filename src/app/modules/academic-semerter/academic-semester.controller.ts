import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { SemesterServices } from './academic-semester.services'

const handleCreateAcademicSemester = catchAsync(async (req, res) => {
  const result = await SemesterServices.createAcademicSemesterIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  })
})

const handleGetSemesters = catchAsync(async (req, res) => {
  const result = await SemesterServices.getAcademicSemesters()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters data retrieved successfully',
    data: result,
  })
})

const handleGetSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const result = await SemesterServices.getSingleSemester(semesterId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester data retrieved successfully',
    data: result,
  })
})

const handleUpdateSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params

  const result = await SemesterServices.updateSemester(semesterId, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester updated successfully !',
    data: result,
  })
})

export const semesterControllers = {
  handleCreateAcademicSemester,
  handleGetSemesters,
  handleGetSingleSemester,
  handleUpdateSemester,
}
