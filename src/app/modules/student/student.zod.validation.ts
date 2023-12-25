import { z } from 'zod'

const createUserNameValidationSchema = z.object({
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

const createGuardianValidationSchema = z.object({
  motherName: z.string(),
  fatherName: z.string(),
  fatherOcup: z.string(),
  motherOcup: z.string(),
  fatherContact: z.string(),
})

const createLocalGuardianValidationSchema = z.object({
  name: z.string(),
  address: z.string(),
  contactNo: z.string(),
})

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string({ invalid_type_error: 'Password must be a string' })
      .max(20, { message: 'Password can not be more than 20 characters' })
      .optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['Male', 'Female', 'Other']),
      dob: z.string().trim().optional(),
      contactNumber: z.string(),
      emgContact: z.string(),
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
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImg: z.string(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
})

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: `{#label} must start with an uppercase letter and be followed by lowercase letters`,
    })
    .optional(), // If optional, trim is applied without requiring the field
  middleName: z.string().optional(), // If optional, trim is applied without requiring the field
  lastName: z
    .string()
    .min(1)
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: `{#label} must only contain alphabetical characters`,
    })
    .optional(),
})

const updateGuardianValidationSchema = z.object({
  motherName: z.string().optional(),
  fatherOcup: z.string().optional(),
  motherOcup: z.string().optional(),
  fatherName: z.string().optional(),
  fatherContact: z.string().optional(),
})

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  contactNo: z.string().optional(),
})

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(['Male', 'Female', 'Other']).optional(),
      dob: z.string().trim().optional(),
      contactNumber: z.string().optional(),
      emgContact: z.string().optional(),
      email: z.string().email().optional(),
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
      address: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
})

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}
