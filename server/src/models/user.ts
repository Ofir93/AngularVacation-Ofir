import { model, Schema } from "mongoose"
import { Iuser } from "../interfaces/user"

const userSchema = new Schema<Iuser>({
    id: Number,
    first_name: String,
    last_name: String,
    user_name: String,
    password: String,
    liked: [String]
})

export const User = model<Iuser>('users', userSchema)

