import { Router } from 'express'
import vaidateRequest from '../../middlewares/validateRequest'
import { DepartmentValidations } from './academic-department.validation'
import { departmentControllers } from './academic-department.controller'

const router = Router()

router.post(
  '/create-department',
  vaidateRequest(
    DepartmentValidations.createacademicDepartmentValidationSchema,
  ),
  departmentControllers.handleCreateAcademicDepartment,
)
router.get('/', departmentControllers.handleGeDepartments)

router.get('/:departmentId', departmentControllers.handleGetSingleDepartment)

router.patch(
  '/:departmentId',
  vaidateRequest(
    DepartmentValidations.updateacademicDepartmentValidationSchema,
  ),
  departmentControllers.handleUpdateDepartment,
)

export const AcademicDepartmentRoutes = router
