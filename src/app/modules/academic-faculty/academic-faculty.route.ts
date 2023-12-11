import { Router } from 'express'
import vaidateRequest from '../../middlewares/validateRequest'
import { FacultyValidations } from './academic-faculty.validation'
import { facultyControllers } from './academic-faculty.controller'

const router = Router()

router.post(
  '/create-faculty',
  vaidateRequest(FacultyValidations.createacademicFacultyValidationSchema),
  facultyControllers.handleCreateAcademicFaculty,
)
router.get('/', facultyControllers.handleGetFaulties)

router.get('/:facultyId', facultyControllers.handleGetSingleFaculty)

router.patch(
  '/:facultyId',
  vaidateRequest(FacultyValidations.updateacademicFacultyValidationSchema),
  facultyControllers.handleUpdateFaculty,
)

export const AcademicFacultyRoutes = router
