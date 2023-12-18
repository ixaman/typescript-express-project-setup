import express from 'express'
import { userControllers } from './user.controllers'
import { studentValidations } from '../student/student.zod.validation'
import validateRequest from '../../middlewares/validateRequest'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.handleCreateStudent,
)

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  userControllers.handleCreateFaculty,
)

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  userControllers.handleCreateAdmin,
)

export const UserRoutes = router
