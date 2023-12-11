import { Router } from 'express'
import { StudentsRoutes } from '../modules/student/student.route'
import { UserRoutes } from '../modules/user/user.routes'
import { AcademicSemesterRoutes } from '../modules/academic-semerter/academic-semester.route'
import { AcademicFacultyRoutes } from '../modules/academic-faculty/academic-faculty.route'
import { AcademicDepartmentRoutes } from '../modules/academic-department/academic-department.routes'

const router = Router()

const applicationRoutes = [
  { path: '/students', route: StudentsRoutes },
  { path: '/users', route: UserRoutes },
  { path: '/semesters', route: AcademicSemesterRoutes },
  { path: '/faculties', route: AcademicFacultyRoutes },
  { path: '/departments', route: AcademicDepartmentRoutes },
]

applicationRoutes.forEach((route) => router.use(route.path, route.route))

export default router
