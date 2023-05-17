import { Iuser } from '../interfaces/user'
import { User } from '../models/user'
import { Document } from 'mongoose'

export const createUser = async (
  doc: Iuser
): Promise<Document<unknown, any, Iuser> | null> => {
  const {user_name} = doc
  const user = new User(doc)

  const exists = await findUser(user_name)
  if (exists !== null || user_name === 'admin') {
    console.log('User name already exists')
    return null
  }

  return await user.save()
}

export const findUser = async (
  user_name: string
): Promise<Document<unknown, any, Iuser> | null> => {
  return await User.findOne({user_name: user_name})
}

export const findUsers = async (filter: {
  userName?: string
  id?: number
}): Promise<Iuser[]> => {
// }): Promise<Document<unknown, any, Iuser>[]> => {
  const { userName, id } = filter
  // console.log(filter);
  switch (true) {
    case userName !== undefined:
      // console.log(filter, "1");
      return await User.find({
        user_name: userName,
      })
    case id !== undefined:
      // console.log(filter, "2");
      return await User.find({
        id: id,
      })
    default:
      // console.log("3");
      return await User.find({})
  }
}

// export const findUsersWithLimitSortSelect = async (
//   limit: number,
//   key: string,
//   keys: string[],
//   userName: boolean
// ): Promise<Document<unknown, any, Iuser>[]> => {
//     const select: any = {}
//     for(const key of keys) {
//         select[key] = 1
//     }
//   return await User.find()
//     .limit(limit)
//     .sort({ [key]: userName ? -1 : 1 })
//     .select(select)
// }
