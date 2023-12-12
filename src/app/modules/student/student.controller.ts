import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import AppError from '../../error/AppError'

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
  const { studentId: sId } = req.params
  const data = await StudentServices.getSingleStudent(sId)

  if (data?.id) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Data received',
      data,
    })
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found')
  }
})

const handleDeleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await StudentServices.deleteStudentFromDB(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted succesfully',
    data: result,
  })
})

export const StudentControllers = {
  handleGetStudents,
  handleGetSingleStudent,
  handleDeleteStudent,
}
