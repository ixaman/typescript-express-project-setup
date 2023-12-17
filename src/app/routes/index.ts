import { Router } from 'express'
import { StudentsRoutes } from '../modules/student/student.route'
import { UserRoutes } from '../modules/user/user.routes'
import { AcademicSemesterRoutes } from '../modules/academic-semerter/academic-semester.route'
import { AcademicFacultyRoutes } from '../modules/academic-faculty/academic-faculty.route'
import { AcademicDepartmentRoutes } from '../modules/academic-department/academic-department.routes'
import { FacultyMemberRoutes } from '../modules/faculty/faculty.route'

const router = Router()

const applicationRoutes = [
  { path: '/students', route: StudentsRoutes },
  { path: '/faculties', route: FacultyMemberRoutes },
  { path: '/users', route: UserRoutes },
  { path: '/semesters', route: AcademicSemesterRoutes },
  { path: '/academic-faculties', route: AcademicFacultyRoutes },
  { path: '/departments', route: AcademicDepartmentRoutes },
]

applicationRoutes.forEach((route) => router.use(route.path, route.route))

export default router
