import { Router, Request, Response } from 'express'
import {
  createVacation,
  deleteById,
  findVacation,
  findVacations,
  updateVac,
} from '../controllers/vacations'

const router: Router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { destination, id } = req.body
    const exists = await findVacations({ destination, id })
    if (exists.length === 0) {
      const vacation = await createVacation(req.body)
      res.send(vacation)
    }else{
    res.send("Vacation already exists")
    }
  } catch (error) {
    console.error(error)
    res.sendStatus(500).send(error)
  }
})

router.get('/', async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const vacation = await findVacations(req.body)
    res.send(vacation)
  } catch (error) {
    console.error(error)
    res.sendStatus(500).send(error)
  }
})

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const isUpdated = await updateVac(req.body)
    isUpdated.acknowledged 
      ? res.send({message:`Vacation ${req.params.id} updated!`})
      : res.send({message:'Nothing updated'})
  } catch (error) {
    console.log(error)
    res.status(500).send('Nothing updated')
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const isDeleted = await deleteById(+req.params.id)
    isDeleted.deletedCount
      ? res.send({message: `Vacation ${req.params.id} deleted!`})
      : res.send({message:'Nothing deleted'})
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})


export default router
