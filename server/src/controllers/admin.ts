import { Iadmin } from '../interfaces/admin'
import { Admin } from '../models/admin'
import { Document } from 'mongoose'

export const createAdmin = async (
  doc: Iadmin
): Promise<Document<unknown, any, Iadmin>> => {
  const admin = new Admin(doc)
  return await admin.save()
}

export const findAdmin = async (
  id: string
): Promise<Document<unknown, any, Iadmin> | null> => {
  return await Admin.findById(id)
}

export const findAdmins = async (filter: {
  userName?: string
  id?: number
}): Promise<Iadmin[]> => {
// }): Promise<Document<unknown, any, Iadmin>[]> => {
  const { userName, id } = filter
  // console.log(filter);
  switch (true) {
    case userName !== undefined:
      // console.log(filter, "1");
      return await Admin.find({
        user_name: userName,
      })
    case id !== undefined:
      // console.log(filter, "2");
      return await Admin.find({
        id: id,
      })
    default:
      // console.log("3");
      return await Admin.find({})
  }
}

// export const findAdminsWithLimitSortSelect = async (
//   limit: number,
//   key: string,
//   keys: string[],
//   userName: boolean
// ): Promise<Document<unknown, any, Iadmin>[]> => {
//     const select: any = {}
//     for(const key of keys) {
//         select[key] = 1
//     }
//   return await Admin.find()
//     .limit(limit)
//     .sort({ [key]: userName ? -1 : 1 })
//     .select(select)
// }
