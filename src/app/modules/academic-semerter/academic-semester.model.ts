import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academic-semester.interface'
import {
  Months,
  SemestersName,
  SemestersCode,
} from './academic-semester.constants'

// creating academic semester schema
const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: SemestersName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: SemestersCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
)

//this is to check wheather a semester already exist or not
academicSemesterSchema.pre('save', async function (next) {
  const semesterExist = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  })
  if (semesterExist) {
    throw new Error('Semester already exist !')
  }
  next()
})

// creating model from schema
const AcademicSemester = model<TAcademicSemester>(
  'Semester',
  academicSemesterSchema,
)

export default AcademicSemester
