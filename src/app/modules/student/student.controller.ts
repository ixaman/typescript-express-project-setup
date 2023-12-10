import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const handleGetStudents = catchAsync(async (req, res) => {
  const data = await StudentServices.getStudentsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students data retrived successfully',
    data,
  })
})

const handleGetSingleStudent = catchAsync(async (req, res) => {
  const { id: sId } = req.params
  const data = await StudentServices.getSingleStudent(sId)

  if (data?.id) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Data received',
      data,
    })
  } else {
    throw new Error('Student not found')
  }
})

export const StudentControllers = {
  handleGetStudents,
  handleGetSingleStudent,
}
