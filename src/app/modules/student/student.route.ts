import express from 'express'
import { StudentControllers } from './student.controller'
import vaidateRequest from '../../middlewares/validateRequest'
import { studentValidations } from './student.zod.validation'

const router = express.Router()

// will call controller
router.get('/', StudentControllers.handleGetStudents)
router.get('/:studentId', StudentControllers.handleGetSingleStudent)
router.delete('/:studentId', StudentControllers.handleDeleteStudent)
router.patch(
  '/:studentId',
  vaidateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.handleUpdateStudent,
)

export const StudentsRoutes = router
