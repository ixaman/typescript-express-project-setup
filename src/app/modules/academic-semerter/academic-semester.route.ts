import { Router } from 'express'
import { semesterControllers } from './academic-semester.controller'
import validateRequest from '../../middlewares/validateRequest'
import { SemesterValidations } from './academic-semester.validation'
import authMiddleware from '../../middlewares/auth'

const router = Router()

router.post(
  '/create-semester',
  validateRequest(SemesterValidations.createSemesterValidationSchema),
  semesterControllers.handleCreateAcademicSemester,
)
router.get('/', authMiddleware('admin'), semesterControllers.handleGetSemesters)
router.get('/:semesterId', semesterControllers.handleGetSingleSemester)
router.patch(
  '/:semesterId',
  validateRequest(SemesterValidations.updateSemesterValidationSchema),
  semesterControllers.handleUpdateSemester,
)

export const AcademicSemesterRoutes = router
