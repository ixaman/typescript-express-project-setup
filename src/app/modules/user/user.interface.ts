import { Model } from 'mongoose'
import { userRoles } from './user.constant'

export interface TUser {
  id: string
  password: string
  needPassChanges: boolean
  passwordChangedAt?: Date
  role: 'admin' | 'student' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export type TUserRole = keyof typeof userRoles

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>

  isPasswordMatched(plainTextPass: string, hashedPass: string): Promise<boolean>

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean
}
