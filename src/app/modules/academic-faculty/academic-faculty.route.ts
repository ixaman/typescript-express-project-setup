import { Router } from 'express'
import vaidateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyValidations } from './academic-faculty.validation'
import { academicFacultyControllers } from './academic-faculty.controller'

const router = Router()

router.post(
  '/create-academic-faculty',
  vaidateRequest(
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
  vaidateRequest(
    AcademicFacultyValidations.updateacademicFacultyValidationSchema,
  ),
  academicFacultyControllers.handleUpdateAcademicFaculty,
)

export const AcademicFacultyRoutes = router
