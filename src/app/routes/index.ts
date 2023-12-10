import { Router } from 'express'
import { StudentsRoutes } from '../modules/student/student.route'
import { UserRoutes } from '../modules/user/user.routes'
import { AcademicSemesterRoutes } from '../modules/academic-semerter/academic-semester.route'

const router = Router()

const applicationRoutes = [
  { path: '/students', route: StudentsRoutes },
  { path: '/users', route: UserRoutes },
  { path: '/semesters', route: AcademicSemesterRoutes },
]

applicationRoutes.forEach((route) => router.use(route.path, route.route))

export default router
