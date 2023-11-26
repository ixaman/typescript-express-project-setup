import Joi from 'joi'

const joiUserNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/, 'capitalize')
    .message(
      `{#label} must start with uppercase letter and followed by lowercase`,
    ),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .required()
    .pattern(/^[a-zA-Z]+$/, 'alpha')
    .message(`{#label} must only contain alphabetical characters`),
})

const joiGurdianValidationSchema = Joi.object({
  motherName: Joi.string().required(),
  fatherName: Joi.string().required(),
  fatherOcup: Joi.string().required(),
  motherOcup: Joi.string().required(),
  fatherContact: Joi.string().required(),
})

const joiLocalGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  contactNo: Joi.string().required(),
})

const joiStudentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: joiUserNameValidationSchema.required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  dob: Joi.string(),
  contactNumber: Joi.string(),
  emgContact: Joi.string(),
  email: Joi.string().email().required(),
  bloodGroup: Joi.string().valid(
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
  ),
  address: Joi.string().required(),
  guardian: joiGurdianValidationSchema.required(),

  localGuardian: joiLocalGuardianValidationSchema.required(),
  avatar: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
})

export default joiStudentValidationSchema
