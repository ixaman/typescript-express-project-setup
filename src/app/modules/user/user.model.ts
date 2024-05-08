import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'
import { UserStatus } from './user.constant'

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
    },
    needPassChanges: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['superAdmin', 'admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

// hassing password before saving to database by using pre middlewere
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.salt_round))
  next()
})

//set " " after saving password
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password')
}

userSchema.statics.isPasswordMatched = async function (
  plainTextPass,
  hashedPass,
) {
  return await bcrypt.compare(plainTextPass, hashedPass)
}

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000

  return passwordChangedTime > jwtIssuedTimestamp
}

const User = model<TUser, UserModel>('User', userSchema)

export default User
