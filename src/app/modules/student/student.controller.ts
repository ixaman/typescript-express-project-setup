import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import AppError from '../../error/AppError'

//HANDLE GET ALL STUDENTS
const handleGetStudents = catchAsync(async (req, res) => {
  const data = await StudentServices.getStudentsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students data retrived successfully',
    data,
  })
})

//HANDLE GET SINGLE STUDENT
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

//UPDATE STUDENT
const handleUpdateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const { student } = req.body
  const result = await StudentServices.updateStudentIntoDB(studentId, student)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  })
})

//HANDLE DELETE STUDENT
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
  handleUpdateStudent,
}
