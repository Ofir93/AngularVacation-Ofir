import { Ivacation } from '../interfaces/vacation'
import { Vacation } from '../models/vacation'
import { Document } from 'mongoose'

export const createVacation = async (
  doc: Ivacation
): Promise<Document<unknown, any, Ivacation>> => {
  const vacation = new Vacation(doc)
  return await vacation.save()
}

export const findVacation = async (
  id: string
): Promise<Document<unknown, any, Ivacation> | null> => {
  return await Vacation.findById(id)
}

export const findVacations = async (filter: {
  desc?: string
  id?: number
}): Promise<Document<unknown, any, Ivacation>[]> => {
  const { desc, id } = filter
  switch (true) {
    case desc !== undefined:
      return await Vacation.find({
        desc: desc,
      })
    case id !== undefined:
      return await Vacation.find({
        id: id,
      })
    default:
      return await Vacation.find({})
  }
}


export const updateVac = async (
 vac: Ivacation
): Promise<Document<unknown, any, Ivacation>> => {
 const updated = await Vacation.updateOne({id: vac.id},  {$set:{vac}}, function (err: Error, docs: Document) {
    if (err){
      console.log(err);
        return null
    }
    else{
        return 1
    }
    })
    return updated
}
