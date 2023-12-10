import { Router } from 'express'
import { semesterControllers } from './academic-semester.controller'
import vaidateRequest from '../../middlewares/validateRequest'
import { SemesterValidations } from './academic-semester.validation'

const router = Router()

router.post(
  '/create-semester',
  vaidateRequest(SemesterValidations.createSemesterValidationSchema),
  semesterControllers.handleCreateAcademicSemester,
)
router.get('/', semesterControllers.handleGetSemesters)
router.get('/:semesterId', semesterControllers.handleGetSingleSemester)
router.patch(
  '/:semesterId',
  vaidateRequest(SemesterValidations.updateSemesterValidationSchema),
  semesterControllers.handleUpdateSemester,
)

export const AcademicSemesterRoutes = router
