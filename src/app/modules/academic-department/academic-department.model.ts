import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './academic-department.interface'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
)

const AcademicDepartment = model<TAcademicDepartment>(
  'Department',
  academicDepartmentSchema,
)

export default AcademicDepartment
