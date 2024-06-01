/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { OfferedCourse } from '../offeredCourse/offeredCourse.model'
import { TEnrolledCourse } from './enrolledCourse.interface'
import EnrolledCourse from './enrolledCourse.model'
import Student from '../student/student.model'
import mongoose from 'mongoose'
import SemesterRegistration from '../semesterRegistration/semesterRegistration.model'
import { Course } from '../course/course.model'
import { FacultyMember } from '../faculty/faculty.model'
import { calculateGradesAndPoints } from './enrolledCourse.utils'

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /*
   * STEP-1 : Check if the offered course exist & Offered course exceed max capacity
   * STEP-2: Check if the student already enrolled in the course
   * STEP-3: Check if the max credit exceed
   * STEP-4: Create an enrolled course
   */

  const { offeredCourse } = payload

  //checking step-1
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse)

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found!')
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Max capacity exceed!')
  }

  //checkign step-2

  const student = await Student.findOne({ id: userId }, { _id: 1 })

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found!')
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student._id,
  })

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled!')
  }

  //check if total credit exceed the max credit
  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistration,
    { maxCredit: 1 },
  )

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourse',
      },
    },
    {
      $unwind: '$enrolledCourse',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourse.credits' },
      },
    },
    {
      $project: { _id: 0, totalEnrolledCredits: 1 },
    },
  ])

  const course = await Course.findById(isOfferedCourseExists.course)
  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0

  if (
    totalCredits &&
    semesterRegistration?.maxCredit &&
    totalCredits + course?.credits > semesterRegistration?.maxCredit
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have exceeded maximum number of credits !',
    )
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    //step-3
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists?.semesterRegistration,
          academicSemester: isOfferedCourseExists?.academicSemester,
          academicFaculty: isOfferedCourseExists?.academicFaculty,
          academicDepartment: isOfferedCourseExists?.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists?.course,
          student: student._id,
          faculty: isOfferedCourseExists?.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    )

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to enroll in course !')
    }

    const maxCapacity = isOfferedCourseExists?.maxCapacity
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    })

    await session.commitTransaction()
    await session.endSession()

    return result
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration)

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found!')
  }

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse)

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found!')
  }

  const isStudentExist = await Student.findById(student)

  if (!isStudentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found!')
  }

  const isStudentEnrolledInCourse = await EnrolledCourse.findOne({
    student: student,
  })

  if (!isStudentEnrolledInCourse) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Student not enrolled in the course!',
    )
  }

  const faculty = await FacultyMember.findOne({ id: facultyId }, { _id: 1 })

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found!')
  }

  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  })

  if (!isCourseBelongToFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!')
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  }

  //checking if courseMarks includes finalTerm result then calculates grades and points
  if (courseMarks?.finalTerm) {
    const { classTest1, midTerm, classTest2 } =
      isCourseBelongToFaculty.courseMarks

    const totalMarks =
      Math.ceil(classTest1 * 0.1) +
      Math.ceil(midTerm * 0.3) +
      Math.ceil(classTest2 * 0.1) +
      Math.ceil(courseMarks.finalTerm * 0.5)

    const result = calculateGradesAndPoints(totalMarks)

    modifiedData.grade = result.grade
    modifiedData.gradePoints = result.gradePoints
    modifiedData.isCompleted = true
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    { new: true },
  )

  return result
}

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
}
