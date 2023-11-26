import { z } from 'zod'

const zodUserNameValidationSchema = z.object({
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

const zodGuardianValidationSchema = z.object({
  motherName: z.string().min(1),
  fatherName: z.string().min(1),
  fatherOcup: z.string().min(1),
  motherOcup: z.string().min(1),
  fatherContact: z.string().min(1),
})

const zodLocalGuardianValidationSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  contactNo: z.string().min(1),
})

const zodStudentValidationSchema = z.object({
  id: z.string().min(1),
  name: zodUserNameValidationSchema,
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
  guardian: zodGuardianValidationSchema,
  localGuardian: zodLocalGuardianValidationSchema,
  avatar: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
})

export default zodStudentValidationSchema
