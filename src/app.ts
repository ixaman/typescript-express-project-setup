import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentsRoutes } from './app/modules/student/student.route'

const app: Application = express()
// parser
app.use(express.json())
app.use(express.text())
app.use(cors())

// application routes
app.use('/api/v1/students', StudentsRoutes)

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome To P.H University Api !',
  })
})

export default app
