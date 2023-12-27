import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { OfferedCourseServices } from './offeredCourse.service'

const handleCreateOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(
      req.body,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered Course is created successfully !',
      data: result,
    })
  },
)

const handleUpdateOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
      id,
      req.body,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourse updated successfully',
      data: result,
    })
  },
)

const handleGetAllOfferedCourses = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(
      req.query,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourses retrieved successfully !',
      data: result,
    })
  },
)

const handleGetSingleOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourse fetched successfully',
      data: result,
    })
  },
)

const handleDeleteOfferedCourseFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await OfferedCourseServices.deleteOfferedCourseFromDB(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourse deleted successfully',
      data: result,
    })
  },
)

export const OfferedCourseControllers = {
  handleCreateOfferedCourse,
  handleUpdateOfferedCourse,
  handleGetAllOfferedCourses,
  handleGetSingleOfferedCourse,
  handleDeleteOfferedCourseFromDB,
}
