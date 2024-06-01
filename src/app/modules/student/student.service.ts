import Student from './student.model'
import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import User from '../user/user.model'
import { TStudent } from './student.interface'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchableFields } from './student.constants'
import mongoose from 'mongoose'

//GET ALL STUDENTS
const getStudentsFromDB = async (query: Record<string, unknown>) => {
  // console.log('baseQuery:', query)
  // const queryObj = { ...query }

  // // handling searchTerm search which will perform a partial search on selected properties

  // let searchTerm = ''
  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string
  // }

  // // TO SEARCH AND MATCH PARTIAL SEARCHTERM WE CAN CHOOSE PROPERTIES TO PERFORM SEARCH
  // //{email: {$regex: query.searchTerm, $options: i}}
  // //{name.firstName: {$regex: query.searchTerm, $options: i}}
  // //{address: {$regex: query.searchTerm, $options: i}}

  // const searchQuery = Student.find({
  //   $or: searchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  // // handling filter query

  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
  // excludeFields.map((item) => delete queryObj[item])

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   })

  // SORT Query
  // let sort = '-createdAt'

  // if (query.sort) {
  //   sort = query.sort as string
  // }

  // const sortQuery = filterQuery.sort(sort)

  // paginate query
  // let limit = 1
  // let page = 1
  // let skip = 0

  // if (query.limit) {
  //   limit = Number(query.limit)
  // }

  // if (query.page) {
  //   page = Number(query.page)
  //   skip = (page - 1) * limit
  // }

  // const paginateQuery = sortQuery.skip(skip)

  // const limitQuery = paginateQuery.limit(limit)

  // FIELD LIMITING QUERY
  // let fields = '-__v'

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ')
  // }

  // const fieldQuery = await limitQuery.select(fields)

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery
  const meta = await studentQuery.countTotal()

  return {
    meta,
    result,
  }
}

//GET SINGLE STUDENTS
const getSingleStudent = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

//UPDATE STUDENT
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  })

  return result
}

//DELETE STUDENT FROM DB
const deleteStudentFromDB = async (id: string) => {
  //creating an instance of Model student so that it can access instance method isExist()
  const user = new Student()
  const isUserExist = await user.isExist(id)

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !')
  }
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }, //to get the latest data
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    //get deleted students userId
    const userId = deletedStudent.user

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
  }
}

export const StudentServices = {
  getStudentsFromDB,
  getSingleStudent,
  deleteStudentFromDB,
  updateStudentIntoDB,
}
