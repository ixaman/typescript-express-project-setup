import express from 'express'
import { userControllers } from './user.controllers'
import { studentValidations } from '../student/student.zod.validation'
import vaidateRequest from '../../middlewares/validateRequest'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'

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

export const UserRoutes = router
