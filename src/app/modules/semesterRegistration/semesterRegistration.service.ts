import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import AcademicSemester from '../academic-semerter/academic-semester.model'
import { TSemesterRegistration } from './semesterRegistration.interface'
import SemesterRegistration from './semesterRegistration.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { RegistrationStatus } from './semesterRegistration.constant'
import mongoose from 'mongoose'
import { OfferedCourse } from '../offeredCourse/offeredCourse.model'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester

  //check if there's any 'UPCOMING' | 'ONGOING' semster already presents in DB
  const isUpcomingOrOngoingSemesterExist = await SemesterRegistration.findOne({
    $or: [
      { status: RegistrationStatus.upcoming },
      { status: RegistrationStatus.ongoing },
    ],
  })

  if (isUpcomingOrOngoingSemesterExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isUpcomingOrOngoingSemesterExist.status} semester registered!`,
    )
  }

  //check if semesterRegistration already exist or not
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester: academicSemester,
  })
  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered!',
    )
  }

  //check the semester exist or not
  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester)
  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found !',
    )
  }

  const result = await SemesterRegistration.create(payload)

  return result
}

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await semesterRegistrationQuery.modelQuery

  return result
}

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester')

  return result
}

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //check if semesterRegistration already exist or not
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id)

  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found!')
  }

  //ensuring'ENDED'  semster can not be updated
  const currentSemesterStatus = isSemesterRegistrationExist?.status
  const requestedSemesterStatus = payload?.status

  if (currentSemesterStatus === RegistrationStatus.ended) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    )
  }

  //UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === RegistrationStatus.upcoming &&
    requestedSemesterStatus === RegistrationStatus.ended
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${currentSemesterStatus} can not be changed to ${requestedSemesterStatus}`,
    )
  }

  if (
    currentSemesterStatus === RegistrationStatus.ongoing &&
    requestedSemesterStatus === RegistrationStatus.upcoming
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${currentSemesterStatus} can not be changed to ${requestedSemesterStatus}`,
    )
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  return result
}

const deleteSemesterRegistrationFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id)

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This registered semester is not found !',
    )
  }

  // checking if the status is still "UPCOMING"
  const semesterRegistrationStatus = isSemesterRegistrationExists.status

  if (semesterRegistrationStatus !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update as the registered semester is ${semesterRegistrationStatus}`,
    )
  }

  const session = await mongoose.startSession()

  //deleting associated offered courses

  try {
    session.startTransaction()

    const deletedOfferedCourse = await OfferedCourse.deleteMany(
      {
        semesterRegistration: id,
      },
      {
        session,
      },
    )

    if (!deletedOfferedCourse) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
      )
    }

    const deletedSemisterRegistration =
      await SemesterRegistration.findByIdAndDelete(id, {
        session,
        new: true,
      })

    if (!deletedSemisterRegistration) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
      )
    }

    await session.commitTransaction()
    await session.endSession()

    return null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
}
