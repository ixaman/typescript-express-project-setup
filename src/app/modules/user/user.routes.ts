import express from 'express'
import { userControllers } from './user.controllers'
import { studentValidations } from '../student/student.zod.validation'
import vaidateRequest from '../../middlewares/validateRequest'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'

const router = express.Router()

router.post(
  '/create-student',
  vaidateRequest(studentValidations.createStudentValidationSchema),
  userControllers.handleCreateStudent,
)

router.post(
  '/create-faculty',
  vaidateRequest(createFacultyValidationSchema),
  userControllers.handleCreateFaculty,
)

router.post(
  '/create-admin',
  vaidateRequest(createAdminValidationSchema),
  userControllers.handleCreateAdmin,
)

export const UserRoutes = router
