import { Router, Request, Response } from 'express'
import {
  createVacation,
  findVacation,
  findVacations,
} from '../controllers/vacations'

const router: Router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { desc, id } = req.body
    const exists = await findVacations({ desc, id })
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

// router.patch('/:id', async (req, res) => {
//   try {
//     const isUpdated = await update(req.params.id, req.body)
//     isUpdated
//       ? res.send(`Vacation ${req.params.id} updated!`)
//       : res.send('Nothing updated')
//   } catch (error) {
//     console.log(error)
//     res.status(500).send('Nothing updated')
//   }
// })

// router.delete('/:id', async (req, res) => {
//   try {
//     const isDeleted = await deleteById(req.params.id)
//     isDeleted
//       ? res.send(`Vacation ${req.params.id} deleted!`)
//       : res.send('Nothing deleted')
//   } catch (error) {
//     console.log(error)
//     res.status(500)
//   }
// })


export default router
