import express, { NextFunction, Request, Response } from 'express'
import { userControllers } from './user.controllers'
import { studentValidations } from '../student/student.zod.validation'
import validateRequest from '../../middlewares/validateRequest'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'
import authMiddleware from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'
import { UserValidations } from './user.validations'
import { upload } from '../../utils/sendAssetToCloudinary'

const router = express.Router()

router.post(
  '/create-student',
  authMiddleware(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.handleCreateStudent,
)

router.post(
  '/create-faculty',
  authMiddleware(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(createFacultyValidationSchema),
  userControllers.handleCreateFaculty,
)

router.post(
  '/create-admin',
  authMiddleware(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(createAdminValidationSchema),
  userControllers.handleCreateAdmin,
)

router.post(
  '/change-status/:id',
  authMiddleware(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidations.changeStatusValidationSchema),
  userControllers.handleChangeStatus,
)

router.get(
  '/me',
  authMiddleware(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
  userControllers.handleGetMe,
)

export const UserRoutes = router
