import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()

// will call controller
router.get('/', StudentControllers.handleGetStudents)
router.get('/:studentId', StudentControllers.handleGetSingleStudent)
router.delete('/:studentId', StudentControllers.handleDeleteStudent)

export const StudentsRoutes = router
