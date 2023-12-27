import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { SemesterRegistrationServices } from './semesterRegistration.service'

const handleCreateSemesterRegistrationIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
        req.body,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration Successfull',
      data: result,
    })
  },
)

const handleGetAllSemesterRegistrationFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
        req.query,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SemesterRegestration data are retrived Successfully',
      data: result,
    })
  },
)

const handleGetSingleSemesterRegistrationFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SemesterRegestration data is retrived Successfully',
      data: result,
    })
  },
)

const handleUpdateSemesterRegistrationIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
        id,
        req.body,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SemesterRegestration data updated Successfully',
      data: result,
    })
  },
)

const handleDeleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await SemesterRegistrationServices.deleteSemesterRegistrationFromDB(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is updated successfully',
      data: result,
    })
  },
)

export const SemesterRegistrationControllers = {
  handleCreateSemesterRegistrationIntoDB,
  handleGetAllSemesterRegistrationFromDB,
  handleGetSingleSemesterRegistrationFromDB,
  handleUpdateSemesterRegistrationIntoDB,
  handleDeleteSemesterRegistration,
}
