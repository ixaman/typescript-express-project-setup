import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyValidations } from './academic-faculty.validation'
import { academicFacultyControllers } from './academic-faculty.controller'

const router = Router()

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidations.createacademicFacultyValidationSchema,
  ),
  academicFacultyControllers.handleCreateAcademicFaculty,
)
router.get('/', academicFacultyControllers.handleGetAcademicFaculties)

router.get(
  '/:facultyId',
  academicFacultyControllers.handleGetSingleAcademicFaculty,
)

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidations.updateacademicFacultyValidationSchema,
  ),
  academicFacultyControllers.handleUpdateAcademicFaculty,
)

export const AcademicFacultyRoutes = router
