import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { updateFacultyValidationSchema } from './faculty.validation'
import { FacultyControllers } from './faculty.controller'
import authMiddleware from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.patch(
  '/:id',
  authMiddleware(USER_ROLE.admin),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.handleUpdateFaculty,
)

router.delete(
  '/:id',
  authMiddleware(USER_ROLE.admin),
  FacultyControllers.handleDeleteFaculty,
)

router.get(
  '/:id',
  authMiddleware(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.handleGetSingleFaculty,
)

router.get(
  '/',
  authMiddleware(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.handleGetAllFaculties,
)

export const FacultyMemberRoutes = router
