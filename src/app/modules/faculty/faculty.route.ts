import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { updateFacultyValidationSchema } from './faculty.validation'
import { FacultyControllers } from './faculty.controller'
import authMiddleware from '../../middlewares/auth'
import { userRoles } from '../user/user.constant'

const router = express.Router()

router.patch(
  '/:id',
  authMiddleware(userRoles.admin),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.handleUpdateFaculty,
)

router.delete(
  '/:id',
  authMiddleware(userRoles.admin),
  FacultyControllers.handleDeleteFaculty,
)

router.get(
  '/:id',
  authMiddleware(userRoles.admin, userRoles.faculty),
  FacultyControllers.handleGetSingleFaculty,
)

router.get(
  '/',
  authMiddleware(userRoles.admin, userRoles.faculty),
  FacultyControllers.handleGetAllFaculties,
)

export const FacultyMemberRoutes = router
