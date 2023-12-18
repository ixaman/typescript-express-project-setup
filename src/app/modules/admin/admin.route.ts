import express from 'express'
import { AdminControllers } from './admin.controller'
import { updateAdminValidationSchema } from './admin.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.get('/', AdminControllers.handleGetAllAdmins)

router.get('/:id', AdminControllers.handleGetSingleAdmin)

router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.handleUpdateAdmin,
)

router.delete('/:id', AdminControllers.handleDeleteAdmin)

export const AdminRoutes = router
