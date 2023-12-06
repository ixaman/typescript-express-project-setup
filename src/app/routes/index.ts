import { Router } from 'express'
import { StudentsRoutes } from '../modules/student/student.route'
import { UserRoutes } from '../modules/user/user.routes'

const router = Router()

const applicationRoutes = [
  { path: '/students', route: StudentsRoutes },
  { path: '/users', route: UserRoutes },
]

applicationRoutes.forEach((route) => router.use(route.path, route.route))

export default router
