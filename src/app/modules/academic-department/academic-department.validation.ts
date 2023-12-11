import { z } from 'zod'

const createacademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Department must be a string',
      required_error: 'Must have department name',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Faculty must be a string',
      required_error: 'Department must have a faculty',
    }),
  }),
})

const updateacademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Department must be a string',
        required_error: 'Must have department name',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Faculty must be a string',
        required_error: 'Department must have a faculty',
      })
      .optional(),
  }),
})

export const DepartmentValidations = {
  createacademicDepartmentValidationSchema,
  updateacademicDepartmentValidationSchema,
}
