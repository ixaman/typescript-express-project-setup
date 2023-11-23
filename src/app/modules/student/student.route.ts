import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()

// will call controller
router.post('/create-student', StudentControllers.handleCreateStudent)
router.get('/', StudentControllers.handleGetStudents)
router.get('/:id', StudentControllers.handleGetSingleStudent)

export const StudentsRoutes = router
