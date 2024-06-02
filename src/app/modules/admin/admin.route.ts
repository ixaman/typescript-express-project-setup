import express from 'express'
import { AdminControllers } from './admin.controller'
import { updateAdminValidationSchema } from './admin.validation'
import validateRequest from '../../middlewares/validateRequest'
import authMiddleware from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.get(
  '/',
  authMiddleware(USER_ROLE.superAdmin),
  AdminControllers.handleGetAllAdmins,
)

router.get('/:id', AdminControllers.handleGetSingleAdmin)

router.patch(
  '/:id',
  authMiddleware(USER_ROLE.superAdmin),
  validateRequest(updateAdminValidationSchema),
  AdminControllers.handleUpdateAdmin,
)

router.delete(
  '/:id',
  authMiddleware(USER_ROLE.superAdmin),
  AdminControllers.handleDeleteAdmin,
)

export const AdminRoutes = router
