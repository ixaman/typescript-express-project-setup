import config from '../config'
import { USER_ROLE } from '../modules/user/user.constant'
import User from '../modules/user/user.model'

const superUser = {
  id: '0001',
  email: 'super@admin.com',
  password: config.super_admin_password,
  needPassChanges: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
}

const seedSuperAdmin = async () => {
  //after database is connected check wheather there is any user who is super admin
  const isSuperAdminExist = await User.findOne({ role: USER_ROLE.superAdmin })

  if (!isSuperAdminExist) {
    await User.create(superUser)
  }
}

export default seedSuperAdmin
