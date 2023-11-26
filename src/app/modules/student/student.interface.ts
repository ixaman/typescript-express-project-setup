import { Model } from 'mongoose'
import { Schema } from 'zod'

export type TGuardian = {
  motherName: string
  fatherName: string
  fatherOcup: string
  motherOcup: string
  fatherContact: string
}

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TLocalGuardian = {
  name: string
  address: string
  contactNo: string
}

export type TStudent = {
  id: string
  name: TUserName
  gender: 'Male' | 'Female' | 'Other'
  dob?: string
  contactNumber: string
  emgContact: string
  email: string
  bloodGroup?:
    | 'A'
    | 'B'
    | 'AB'
    | 'O'
    | 'A+'
    | 'A-'
    | 'B+'
    | 'B-'
    | 'AB+'
    | 'AB-'
    | 'O+'
    | 'O-'
  address: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  avatar?: string
  isActive: 'active' | 'blocked'
}

export type StudentMethods = {
  isExist(id: string): Promise<TStudent | null>
}

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>
