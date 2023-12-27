import express from 'express'
import { OfferedCourseValidations } from './offeredCourse.validation'
import validateRequest from '../../middlewares/validateRequest'
import { OfferedCourseControllers } from './offeredCourse.controller'

const router = express.Router()

router.get('/', OfferedCourseControllers.handleGetAllOfferedCourses)

router.get('/:id', OfferedCourseControllers.handleGetSingleOfferedCourse)

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.handleCreateOfferedCourse,
)

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.handleUpdateOfferedCourse,
)

router.delete('/:id', OfferedCourseControllers.handleDeleteOfferedCourseFromDB)

export const OfferedCourseRoutes = router
