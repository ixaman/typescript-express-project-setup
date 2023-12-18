import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { CourseSearchableFields } from './course.constants'
import { TCourse, TCoursefaculty } from './course.interface'
import { Course, CourseFaculty } from './course.model'
import AppError from '../../error/AppError'
import httpStatus from 'http-status'

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload)
  return result
}

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await courseQuery.modelQuery
  return result
}

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  )
  return result
}

//UPDATE HERE
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    //Step-1: Basic course info update
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!')
    }

    //now check if there is any preRequisiteCourses data to update in the payload
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      //filter out the deleted field
      const deletedPreRequisiteId = preRequisiteCourses
        .filter((item) => item.course && item.isDeleted)
        .map((item) => item.course)

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisiteId } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!')
      }

      //filter out the new course field
      const newPreRequisiteCourseData = preRequisiteCourses?.filter(
        (item) => item.course && !item.isDeleted,
      )

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: newPreRequisiteCourseData },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!')
      }
    }

    await session.commitTransaction()
    await session.endSession()

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    )

    return result
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course !')
  }
}

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  )
  return result
}

const assignFacultiesWithCourseWithIntoDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  )

  return result
}

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  )

  return result
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesWithCourseWithIntoDB,
  removeFacultiesFromCourseFromDB,
}
