import { Schema, model } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from './student.interface'
import validator from 'validator'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'Student must have a first naem'],
    maxlength: [20, 'Must be within 20 character'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstStr = value.charAt(0).toUpperCase() + value.slice(1)
        return firstStr === value
      },
      message: '{VALUE} is not in capitalized format',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Must have lastname'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
})

const guardianSchema = new Schema<TGuardian>({
  motherName: { type: String },
  fatherName: { type: String },
  fatherOcup: { type: String },
  motherOcup: { type: String },
  fatherContact: { type: String },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String },
  address: { type: String },
  contactNo: { type: String },
})

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User', //must include the model you want to make reference of
    },
    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: '{VALUE} is not valid. Must be Male, Female or Other',
      },
      required: true,
    },
    dob: { type: String },
    contactNumber: { type: String },
    emgContact: { type: String },
    email: {
      type: String,
      required: [true, 'Must have an email address'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} must follow sturcture',
      },
    },
    bloodGroup: {
      type: String,
      enum: [
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
      ],
    },
    address: { type: String, trim: true },
    guardian: {
      type: guardianSchema,
      required: [true, 'Must have gurdian details'],
    },

    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Must have one local guardian'],
    },
    profileImg: { type: String, default: '' },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'Semester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
)

// filter out deleted documents by using mongoose query middleware (pre)
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

//virtual field fullName added
studentSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName
})

// get all students while excluding isDelete = true
// studentSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
//   next()
// })

// custom instance method to check wheather student already exist
studentSchema.methods.isExist = async function (id: string) {
  const existingUser = await Student.findById(id)
  return existingUser
}

const Student = model<TStudent, StudentModel>('Student', studentSchema)

export default Student
