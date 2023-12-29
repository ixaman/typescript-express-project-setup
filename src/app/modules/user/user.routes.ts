import express from 'express'
import { userControllers } from './user.controllers'
import { studentValidations } from '../student/student.zod.validation'
import validateRequest from '../../middlewares/validateRequest'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'
import authMiddleware from '../../middlewares/auth'
import { userRoles } from './user.constant'

const router = express.Router()

router.post(
  '/create-student',
  authMiddleware(userRoles.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.handleCreateStudent,
)

router.post(
  '/create-faculty',
  authMiddleware(userRoles.admin),
  validateRequest(createFacultyValidationSchema),
  userControllers.handleCreateFaculty,
)

router.post(
  '/create-admin',
  authMiddleware(userRoles.admin),
  validateRequest(createAdminValidationSchema),
  userControllers.handleCreateAdmin,
)

export const UserRoutes = router
