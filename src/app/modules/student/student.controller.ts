import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import AppError from '../../error/AppError'

//HANDLE GET ALL STUDENTS
const handleGetStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getStudentsFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students data retrived successfully',
    data: {
      meta: {
        page: req?.query?.page,
        limit: req?.query?.limit,
        total: result?.length,
      },
      result: result,
    },
  })
})

//HANDLE GET SINGLE STUDENT
const handleGetSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = await StudentServices.getSingleStudent(id)

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
  const { id } = req.params
  const { student } = req.body
  const result = await StudentServices.updateStudentIntoDB(id, student)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  })
})

//HANDLE DELETE STUDENT
const handleDeleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await StudentServices.deleteStudentFromDB(id)

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
