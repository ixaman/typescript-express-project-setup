import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AdminServices } from './admin.service'

const handleGetSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.getSingleAdminFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrieved succesfully',
    data: result,
  })
})

const handleGetAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved succesfully',
    data: result,
  })
})

const handleUpdateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const { admin } = req.body
  const result = await AdminServices.updateAdminIntoDB(id, admin)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated succesfully',
    data: result,
  })
})

const handleDeleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.deleteAdminFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted succesfully',
    data: result,
  })
})

export const AdminControllers = {
  handleGetAllAdmins,
  handleGetSingleAdmin,
  handleDeleteAdmin,
  handleUpdateAdmin,
}
