import express from 'express'
import { userControllers } from './user.controllers'
import { studentValidations } from '../student/student.zod.validation'
import vaidateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-student',
  vaidateRequest(studentValidations.createStudentValidationSchema),
  userControllers.handleCreateStudent,
)

export const UserRoutes = router
