import { model, Schema } from "mongoose"
import { Ivacation } from "../interfaces/vacation"

const vacationSchema = new Schema<Ivacation>({
    id: Number,
    desc: String,
    destination: String,
    photo: String,
    dateStart: Date,
    dateEnd: Date,
    price: Number,
    followers: [String]

})

export const Vacation = model<Ivacation>('vacations', vacationSchema)

