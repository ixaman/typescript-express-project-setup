import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import zodStudentValidationSchema from './student.zod.validation'

const handleCreateStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    const zodparseData = await zodStudentValidationSchema.parse(studentData)
    console.log(zodparseData)

    if (!zodparseData) {
      // Handle validation error (e.g., send a 400 Bad Request response)
      return res.status(400).json({
        success: false,
        message: 'Invalid data',
      })
    }
    const result = await StudentServices.createStudentIntoDb(zodparseData)

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    })
  }
}

const handleGetStudents = async (req: Request, res: Response) => {
  try {
    const data = await StudentServices.getStudentsFromDB()

    res.status(200).json({
      success: true,
      message: 'Students data retrived successfully',
      data,
    })
  } catch (error) {
    console.log(error)
  }
}

const handleGetSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id: sId } = req.params
    const data = await StudentServices.getSingleStudent(sId)

    res.status(200).json({
      success: true,
      message: 'Student Data received',
      data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const StudentControllers = {
  handleCreateStudent,
  handleGetStudents,
  handleGetSingleStudent,
}
