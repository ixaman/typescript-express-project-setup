import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../error/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { TUserRole } from '../modules/user/user.interface'
import User from '../modules/user/user.model'

const authMiddleware = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //check wheather the token is sent from client
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    let decoded

    try {
      //verify the token if its valid or not
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized')
    }

    const { role, userId, iat } = decoded

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

    if (
      user?.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    //decoded
    req.user = decoded as JwtPayload
    next()
  })
}

export default authMiddleware
