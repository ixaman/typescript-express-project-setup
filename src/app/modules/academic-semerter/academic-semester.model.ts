import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academic-semester.interface'
import { Months, Semesters, SemestersCode } from './academic-semester.constants'

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: Semesters,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: SemestersCode,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
    },
    endMonth: {
      type: String,
      enum: Months,
    },
  },
  { timestamps: true },
)

const AcademicSemester = model<TAcademicSemester>(
  'Semester',
  academicSemesterSchema,
)

export default AcademicSemester
