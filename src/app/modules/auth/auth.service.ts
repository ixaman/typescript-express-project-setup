import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import User from '../user/user.model'
import { TLoginUser } from './auth.interface'
import { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import bcrypt from 'bcrypt'
import { createToken, verifyToken } from './auth.utils'
import { sendEmail } from '../../utils/sendEmail'

const loginUser = async (payload: TLoginUser) => {
  //checking if the user is exist
  const user = await User.isUserExistByCustomId(payload.id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }

  //checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
  }

  //checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
  }

  //compare password if they match grant access
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  )
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')
  }

  //create token and send to client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    refreshToken,
    accessToken,
    needsPasswordChange: user?.needPassChanges,
  }
}

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  //checking if the user is exist
  const user = await User.isUserExistByCustomId(userData.userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }

  //checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
  }

  //checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
  }

  //checking if the password is correct
  const isPasswordMatched = await User.isPasswordMatched(
    payload.oldPassword,
    user?.password,
  )
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt_round),
  )

  await User.findOneAndUpdate(
    {
      id: userData?.userId,
      role: userData?.role,
    },
    //updated data
    {
      password: newHashedPassword,
      needPassChanges: false,
      passwordChangedAt: new Date(),
    },
  )
  return null
}

const refreshToken = async (token: string) => {
  //verify the token if its valid or not
  const decoded = verifyToken(token, config.jwt_refresh_secret as string)

  const { userId, iat } = decoded

  //checking if the user is exist
  const user = await User.isUserExistByCustomId(userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }

  //checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
  }

  //checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
  }

  //check if the token is generated before password change. after every password change make the old token invalid
  if (
    user?.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
  }

  //if every validation checked now create new token
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    accessToken,
  }
}

const forgetPassword = async (userId: string) => {
  //verify the id is valid
  const user = await User.isUserExistByCustomId(userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }

  //checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
  }

  //checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
  }

  // genarating token
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  )

  const resetPassLink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`

  sendEmail(user.email, resetPassLink)
}

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  //verify the id is valid
  const user = await User.isUserExistByCustomId(payload.id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }

  //checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
  }

  //checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
  }

  //verifty token
  const decoded = verifyToken(token, config.jwt_access_secret as string)

  if (payload.id !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!')
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt_round),
  )

  await User.findOneAndUpdate(
    {
      id: decoded?.userId,
      role: decoded?.role,
    },
    //updated data
    {
      password: newHashedPassword,
      needPassChanges: false,
      passwordChangedAt: new Date(),
    },
  )
}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
}
