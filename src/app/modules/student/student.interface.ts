export type Guardian = {
  motherName: string
  fatherName: string
  fatherOcup: string
  motherOcup: string
  fatherContact: string
}

export type UserName = {
  firstName: string
  middleName: string
  lastName: string
}

export type LocalGuardian = {
  name: string
  address: string
  contactNo: string
}

export type Student = {
  id: string
  name: UserName
  gender: 'Male' | 'Female'
  dob?: string
  contactNumber: string
  emgContact: string
  email: string
  bloodGroup:
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
  guardian: Guardian
  localGuardian: LocalGuardian
  avatar?: 'string'
  isActive: 'active' | 'blocked'
}
