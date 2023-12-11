import { Router } from 'express'
import { StudentsRoutes } from '../modules/student/student.route'
import { UserRoutes } from '../modules/user/user.routes'
import { AcademicSemesterRoutes } from '../modules/academic-semerter/academic-semester.route'
import { AcademicFacultyRoutes } from '../modules/academic-faculty/academic-faculty.route'

const router = Router()

const applicationRoutes = [
  { path: '/students', route: StudentsRoutes },
  { path: '/users', route: UserRoutes },
  { path: '/semesters', route: AcademicSemesterRoutes },
  { path: '/faculties', route: AcademicFacultyRoutes },
]

applicationRoutes.forEach((route) => router.use(route.path, route.route))

export default router
