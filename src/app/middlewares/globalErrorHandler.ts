/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { TErrorSource } from '../interface/error'
import config from '../config'
import handleZodError from '../error/handleZodError'
import handleValidationError from '../error/handleValidationError'
import handleCastError from '../error/handleCastError'
import handleDuplicate from '../error/handleDuplicate'
import AppError from '../error/AppError'

// Global error handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ]

  // handle different types of  error
  if (err instanceof ZodError) {
    const modifiedError = handleZodError(err)
    statusCode = modifiedError?.statusCode
    message = modifiedError?.message
    errorSources = modifiedError?.errorSources
  } else if (err?.name === 'ValidationError') {
    const modifiedError = handleValidationError(err)
    statusCode = modifiedError?.statusCode
    message = modifiedError?.message
    errorSources = modifiedError?.errorSources
  } else if (err?.name === 'CastError') {
    const modifiedError = handleCastError(err)
    statusCode = modifiedError?.statusCode
    message = modifiedError?.message
    errorSources = modifiedError?.errorSources
  } else if (err?.code === 11000) {
    const modifiedError = handleDuplicate(err)
    statusCode = modifiedError?.statusCode
    message = modifiedError?.message
    errorSources = modifiedError?.errorSources
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    message = err?.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}

export default globalErrorHandler
