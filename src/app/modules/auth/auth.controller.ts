import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'
import config from '../../config'

const handleLoginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)

  const { refreshToken, accessToken, needsPasswordChange } = result

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login succesfull',
    data: {
      accessToken,
      needsPasswordChange,
    },
  })
})

const handleChangePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body

  const result = await AuthServices.changePassword(req.user, passwordData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated succesfully!',
    data: result,
  })
})

const handleRefreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies

  const result = await AuthServices.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token generated successfully!',
    data: result,
  })
})

const handleForgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id

  const result = await AuthServices.forgetPassword(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated and sent to the user successfully !',
    data: result,
  })
})

const handleResetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization

  const result = await AuthServices.resetPassword(req.body, token as string)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password Reset successfull!',
    data: result,
  })
})

export const AuthController = {
  handleLoginUser,
  handleChangePassword,
  handleRefreshToken,
  handleForgetPassword,
  handleResetPassword,
}
