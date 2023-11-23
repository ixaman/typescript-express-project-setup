import { Schema, model, connect } from 'mongoose'
import { Guardian, LocalGuardian, Student, UserName } from './student.interface'

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
})

const guardianSchema = new Schema<Guardian>({
  motherName: { type: String },
  fatherName: { type: String },
  fatherOcup: { type: String },
  motherOcup: { type: String },
  fatherContact: { type: String },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String },
  address: { type: String },
  contactNo: { type: String },
})

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: { type: String, required: true },
  dob: { type: String },
  contactNumber: { type: String },
  emgContact: { type: String },
  email: { type: String, required: true },
  bloodGroup: [
    'A',
    'B',
    'AB',
    'O',
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ],
  address: { type: String },
  guardian: guardianSchema,

  localGuardian: localGuardianSchema,
  avatar: { type: String },
  isActive: ['active', 'blocked'],
})

const StudentModel = model<Student>('Student', studentSchema)

export default StudentModel
