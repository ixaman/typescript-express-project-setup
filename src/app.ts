/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFoundRoute'
import router from './app/routes'
import cookieParser from 'cookie-parser'

const app: Application = express()
// parser
app.use(express.json())
app.use(cookieParser())
app.use(express.text())
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))

// application routes
app.use('/api/v1', router)

//default route
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome To P.H University Api !',
  })
})

// test route
const test = async (req: Request, res: Response) => {
  console.log('This is test')
}

app.get('/test', test)

// Global error handler
app.use(globalErrorHandler)

// Not found route
app.use(notFound)

export default app
