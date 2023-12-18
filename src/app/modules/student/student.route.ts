import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { studentValidations } from './student.zod.validation'

const router = express.Router()

// will call controller
router.get('/', StudentControllers.handleGetStudents)
router.get('/:id', StudentControllers.handleGetSingleStudent)
router.delete('/:id', StudentControllers.handleDeleteStudent)
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.handleUpdateStudent,
)

export const StudentsRoutes = router
