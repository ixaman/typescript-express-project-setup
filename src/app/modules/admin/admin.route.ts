import express from 'express'
import { AdminControllers } from './admin.controller'
import { updateAdminValidationSchema } from './admin.validation'
import vaidateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.get('/', AdminControllers.handleGetAllAdmins)

router.get('/:id', AdminControllers.handleGetSingleAdmin)

router.patch(
  '/:id',
  vaidateRequest(updateAdminValidationSchema),
  AdminControllers.handleUpdateAdmin,
)

router.delete('/:id', AdminControllers.handleDeleteAdmin)

export const AdminRoutes = router
