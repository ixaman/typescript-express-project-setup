import { Request, Response } from 'express'
import { StudentServices } from './student.service'

const handleCreateStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    const student = studentData
    // will call service function to send data
    const result = await StudentServices.createStudentIntoDb(student)
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
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
