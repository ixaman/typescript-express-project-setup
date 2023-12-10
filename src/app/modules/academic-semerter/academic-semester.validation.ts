import { z } from 'zod'
import {
  Months,
  SemestersCode,
  SemestersName,
} from './academic-semester.constants'

const createSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...SemestersName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...SemestersCode] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
})

const updateSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...SemestersName] as [string, ...string[]]).optional(),
    year: z.string(),
    code: z.enum([...SemestersCode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
})

export const SemesterValidations = {
  createSemesterValidationSchema,
  updateSemesterValidationSchema,
}
