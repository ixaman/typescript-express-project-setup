import express from 'express'
import vaidateRequest from '../../middlewares/validateRequest'
import { updateFacultyValidationSchema } from './faculty.validation'
import { FacultyControllers } from './faculty.controller'

const router = express.Router()

router.patch(
  '/:id',
  vaidateRequest(updateFacultyValidationSchema),
  FacultyControllers.handleUpdateFaculty,
)

router.delete('/:id', FacultyControllers.handleDeleteFaculty)
router.get('/:id', FacultyControllers.handleGetSingleFaculty)
router.get('/', FacultyControllers.handleGetAllFaculties)

export const FacultyMemberRoutes = router
