import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needPassChanges: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
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

const User = model<TUser>('User', userSchema)

export default User
