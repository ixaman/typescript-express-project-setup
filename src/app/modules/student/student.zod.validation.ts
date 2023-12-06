import { z } from 'zod'

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: `{#label} must start with an uppercase letter and be followed by lowercase letters`,
    }), // If optional, trim is applied without requiring the field
  middleName: z.string().optional(), // If optional, trim is applied without requiring the field
  lastName: z
    .string()
    .min(1)
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: `{#label} must only contain alphabetical characters`,
    }),
})

const guardianValidationSchema = z.object({
  motherName: z.string().min(1),
  fatherName: z.string().min(1),
  fatherOcup: z.string().min(1),
  motherOcup: z.string().min(1),
  fatherContact: z.string().min(1),
})

const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  contactNo: z.string().min(1),
})

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string({ invalid_type_error: 'Password must be a string' })
      .max(20, { message: 'Password can not be more than 20 characters' })
      .optional(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['Male', 'Female', 'Other']),
      dob: z.string().trim().optional(),
      contactNumber: z.string().min(1),
      emgContact: z.string().min(1),
      email: z.string().email(),
      bloodGroup: z
        .enum([
          'A',
          'B',
          'AB',
          'O',
          'A+',
          'A-',
          'B+',
          'B-',
          'AB+',
          'AB-',
          'O+',
          'O-',
        ])
        .optional(), // Make it required if blood group is mandatory
      address: z.string().min(1),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      avatar: z.string().optional(),
    }),
  }),
})

export const studentValidations = {
  createStudentValidationSchema,
}
