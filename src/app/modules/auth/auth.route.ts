import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'
import authMiddleware from '../../middlewares/auth'
import { userRoles } from '../user/user.constant'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.handleLoginUser,
)

router.post(
  '/change-password',
  authMiddleware(userRoles.admin, userRoles.faculty, userRoles.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.handleChangePassword,
)

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.handleRefreshToken,
)

export const AuthRoutes = router
