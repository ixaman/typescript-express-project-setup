import { userServices } from './user.services'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const handleCreateStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body

  const result = await userServices.createStudentIntoDb(password, studentData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  })
})

export const userControllers = {
  handleCreateStudent,
}
