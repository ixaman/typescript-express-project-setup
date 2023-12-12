import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { semesterNameCodeMapper } from './academic-semester.constants'
import { TAcademicSemester } from './academic-semester.interface'
import AcademicSemester from './academic-semester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (semesterNameCodeMapper[payload.name] === payload.code) {
    const result = await AcademicSemester.create(payload)
    return result
  } else {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester name dont match semester code!',
    )
  }
}

const getAcademicSemesters = async () => {
  const result = await AcademicSemester.find()
  return result
}

const getSingleSemester = async (payload: string) => {
  const result = await AcademicSemester.findOne({ _id: payload })
  return result
}

const updateSemester = async (
  semesterId: string,
  updateData: Partial<TAcademicSemester>,
) => {
  // const semester = AcademicSemester.findOne({_id: semesterId})

  if (
    updateData.name &&
    updateData.code &&
    semesterNameCodeMapper[updateData.name] === updateData.code
  ) {
    const updatedSemester = await AcademicSemester.findByIdAndUpdate(
      { _id: semesterId },
      updateData,
      { new: true },
    )
    return updatedSemester
  } else {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester name dont match semester code!',
    )
  }
}

export const SemesterServices = {
  createAcademicSemesterIntoDB,
  getAcademicSemesters,
  getSingleSemester,
  updateSemester,
}
