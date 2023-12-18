import express from 'express'
import { CourseValidations } from './course.validation'
import validateRequest from '../../middlewares/validateRequest'
import { CourseControllers } from './course.controller'

const router = express.Router()

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.handleCreateCourse,
)

router.get('/:id', CourseControllers.handleGetSingleCourse)

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.handleUpdateCourse,
)

router.delete('/:id', CourseControllers.handleDeleteCourse)

router.get('/', CourseControllers.handleGetAllCourses)

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.handleAssignFacultiesWithCourse,
)

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.handleRemoveFacultiesFromCourse,
)

export const CourseRoutes = router
