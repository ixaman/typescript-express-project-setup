import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { studentValidations } from './student.zod.validation'
import authMiddleware from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

// will call controller
router.get(
  '/',
  authMiddleware(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.superAdmin),
  StudentControllers.handleGetStudents,
)
router.get(
  '/:id',
  authMiddleware(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.superAdmin),
  StudentControllers.handleGetSingleStudent,
)
router.delete(
  '/:id',
  authMiddleware(USER_ROLE.admin, USER_ROLE.superAdmin),
  StudentControllers.handleDeleteStudent,
)
router.patch(
  '/:id',
  authMiddleware(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.handleUpdateStudent,
)

export const StudentsRoutes = router
