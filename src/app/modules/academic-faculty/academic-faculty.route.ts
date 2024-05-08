import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyValidations } from './academic-faculty.validation'
import { academicFacultyControllers } from './academic-faculty.controller'
import authMiddleware from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.post(
  '/create-academic-faculty',
  authMiddleware(USER_ROLE.superAdmin, USER_ROLE.admin),
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
