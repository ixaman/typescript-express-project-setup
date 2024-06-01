import express from 'express'
import { EnrolledCourseValidations } from './enrolledCourse.validation'
import validateRequest from '../../middlewares/validateRequest'
import { EnrolledCourseControllers } from './enrolledCourse.controller'
import authMiddleware from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post(
  '/create-enrolled-course',
  authMiddleware(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.handleCreateEnrolledCourse,
)

router.patch(
  '/update-enrolled_course-marks',
  authMiddleware(USER_ROLE.faculty),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.handleUpdateEnrolledCourseMarks,
)

export const EnrolledCourseRoutes = router
