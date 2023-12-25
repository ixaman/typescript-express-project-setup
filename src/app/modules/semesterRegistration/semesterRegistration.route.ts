import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { SemesterRegistrationValidations } from './semesterRegistration.validation'
import { SemesterRegistrationControllers } from './semesterRegistration.controller'
const router = express.Router()

// will call controller
router.post(
  '/create-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.handleCreateSemesterRegistrationIntoDB,
)

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.handleUpdateSemesterRegistrationIntoDB,
)

router.get(
  '/',
  SemesterRegistrationControllers.handleGetAllSemesterRegistrationFromDB,
)

router.get(
  '/:id',
  SemesterRegistrationControllers.handleGetSingleSemesterRegistrationFromDB,
)

export const SemesterRegistrationRoutes = router
