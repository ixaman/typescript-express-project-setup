import { Router } from 'express'
import { StudentsRoutes } from '../modules/student/student.route'
import { UserRoutes } from '../modules/user/user.routes'
import { AcademicSemesterRoutes } from '../modules/academic-semerter/academic-semester.route'
import { AcademicFacultyRoutes } from '../modules/academic-faculty/academic-faculty.route'
import { AcademicDepartmentRoutes } from '../modules/academic-department/academic-department.routes'
import { FacultyMemberRoutes } from '../modules/faculty/faculty.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { CourseRoutes } from '../modules/course/course.route'
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route'

const router = Router()

const applicationRoutes = [
  { path: '/students', route: StudentsRoutes },
  { path: '/faculties', route: FacultyMemberRoutes },
  { path: '/admins', route: AdminRoutes },
  { path: '/courses', route: CourseRoutes },
  { path: '/users', route: UserRoutes },
  { path: '/semesters', route: AcademicSemesterRoutes },
  { path: '/academic-faculties', route: AcademicFacultyRoutes },
  { path: '/departments', route: AcademicDepartmentRoutes },
  { path: '/semester-registrations', route: SemesterRegistrationRoutes },
]

applicationRoutes.forEach((route) => router.use(route.path, route.route))

export default router
