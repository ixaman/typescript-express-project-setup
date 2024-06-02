import { userServices } from './user.services'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

//CREATE USER--> STUDENT USER
const handleCreateStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body

  const result = await userServices.createStudentIntoDb(
    req.file,
    password,
    studentData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  })
})

//CREATE USER--> FACULTY USER
const handleCreateFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body

  const result = await userServices.createFacultyIntoDB(
    req.file,
    password,
    facultyData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  })
})

//CREATE USER--> ADMIN USER
const handleCreateAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body
  const result = await userServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  })
})

//CHANGE USER STATUS
const handleChangeStatus = catchAsync(async (req, res) => {
  const result = await userServices.changeStatus(req.params.id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status changed successfully!',
    data: result,
  })
})

//GET ME
const handleGetMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user

  const result = await userServices.getMe(userId, role)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully!',
    data: result,
  })
})

export const userControllers = {
  handleCreateStudent,
  handleCreateFaculty,
  handleCreateAdmin,
  handleChangeStatus,
  handleGetMe,
}
