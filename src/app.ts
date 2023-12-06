/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFoundRoute'
import router from './app/routes'

const app: Application = express()
// parser
app.use(express.json())
app.use(express.text())
app.use(cors())

// application routes
app.use('/api/v1', router)

//default route
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome To P.H University Api !',
  })
})

// Global error handler
app.use(globalErrorHandler)

// Not found route
app.use(notFound)

export default app
