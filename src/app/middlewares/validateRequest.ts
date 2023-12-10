import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const vaidateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // do validation here

    try {
      await schema.parseAsync({ body: req.body })
    } catch (error) {
      next(error)
    }

    next()
  }
}

export default vaidateRequest
