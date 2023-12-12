import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './academic-department.interface'
import httpStatus from 'http-status'
import AppError from '../../error/AppError'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
  },
)

// checking if dept already exist using pre middleware
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  })
  if (isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department is already exist !',
    )
  }
  next()
})

// using query middleware to check wheather dept already exist before update
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepartmentExist = await AcademicDepartment.findOne(query)

  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This department does not exist !')
  }

  next()
})

const AcademicDepartment = model<TAcademicDepartment>(
  'Department',
  academicDepartmentSchema,
)

export default AcademicDepartment
