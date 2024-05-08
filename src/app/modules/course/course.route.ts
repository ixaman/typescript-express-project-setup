import express from 'express'
import { CourseValidations } from './course.validation'
import validateRequest from '../../middlewares/validateRequest'
import { CourseControllers } from './course.controller'
import authMiddleware from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post(
  '/create-course',
  authMiddleware(USER_ROLE.admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.handleCreateCourse,
)

router.get(
  '/:id',
  authMiddleware(USER_ROLE.admin, USER_ROLE.admin, USER_ROLE.student),
  CourseControllers.handleGetSingleCourse,
)

router.patch(
  '/:id',
  authMiddleware(USER_ROLE.admin),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.handleUpdateCourse,
)

router.delete(
  '/:id',
  authMiddleware(USER_ROLE.admin),
  CourseControllers.handleDeleteCourse,
)

router.get(
  '/',
  // authMiddleware(userRoles.admin, userRoles.admin, userRoles.student),
  CourseControllers.handleGetAllCourses,
)

router.put(
  '/:courseId/assign-faculties',
  authMiddleware(USER_ROLE.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.handleAssignFacultiesWithCourse,
)

router.delete(
  '/:courseId/remove-faculties',
  authMiddleware(USER_ROLE.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.handleRemoveFacultiesFromCourse,
)

export const CourseRoutes = router
