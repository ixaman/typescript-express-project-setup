export type TUser = {
  id: string
  password: string
  needPassChanges: boolean
  role: 'admin' | 'student' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}
