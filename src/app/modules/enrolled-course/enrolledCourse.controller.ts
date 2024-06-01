import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { EnrolledCourseServices } from './enrolledCourse.services'

const handleCreateEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId

  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled succesfully',
    data: result,
  })
})

const handleUpdateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId

  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Marks updated succesfully!',
    data: result,
  })
})

export const EnrolledCourseControllers = {
  handleCreateEnrolledCourse,
  handleUpdateEnrolledCourseMarks,
}
