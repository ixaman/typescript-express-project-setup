import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { CourseServices } from './course.service'

const handleCreateCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created succesfully',
    data: result,
  })
})

const handleGetAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course are retrieved successfully',
    data: result,
  })
})

const handleGetSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.getSingleCourseFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved succesfully',
    data: result,
  })
})

const handleUpdateCourse = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await CourseServices.updateCourseIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully !',
    data: result,
  })
})

const handleDeleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.deleteCourseFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted succesfully',
    data: result,
  })
})

const handleAssignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const { faculties } = req.body

  const result = await CourseServices.assignFacultiesWithCourseWithIntoDB(
    courseId,
    faculties,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is assigned succesfully',
    data: result,
  })
})

const handleRemoveFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const { faculties } = req.body

  const result = await CourseServices.removeFacultiesFromCourseFromDB(
    courseId,
    faculties,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties removed succesfully',
    data: result,
  })
})

export const CourseControllers = {
  handleCreateCourse,
  handleGetSingleCourse,
  handleGetAllCourses,
  handleDeleteCourse,
  handleUpdateCourse,
  handleAssignFacultiesWithCourse,
  handleRemoveFacultiesFromCourse,
}
