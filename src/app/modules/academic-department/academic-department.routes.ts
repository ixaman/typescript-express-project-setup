import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { DepartmentValidations } from './academic-department.validation'
import { departmentControllers } from './academic-department.controller'

const router = Router()

router.post(
  '/create-department',
  validateRequest(
    DepartmentValidations.createacademicDepartmentValidationSchema,
  ),
  departmentControllers.handleCreateAcademicDepartment,
)
router.get('/', departmentControllers.handleGeDepartments)

router.get('/:departmentId', departmentControllers.handleGetSingleDepartment)

router.patch(
  '/:departmentId',
  validateRequest(
    DepartmentValidations.updateacademicDepartmentValidationSchema,
  ),
  departmentControllers.handleUpdateDepartment,
)

export const AcademicDepartmentRoutes = router
