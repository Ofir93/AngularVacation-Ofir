import { model, Schema } from "mongoose"
import { Iadmin } from "../interfaces/admin"

const adminSchema = new Schema<Iadmin>({
    id: Number,
    user_name: String,
    password: String,
})

export const Admin = model<Iadmin>('admins', adminSchema)

