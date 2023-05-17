import { Router, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { registerValidator, loginValidator } from '../middlewares/formValidator'
import { Iadmin } from '../interfaces/admin'
import matchedData from '../middlewares/matchedData'
import passwordValidator from '../middlewares/passwordValidator'
import passwordEncryptor from '../middlewares/passwordEncryptor'
import adminValidator from '../middlewares/adminValidator'
import jwtSign from '../middlewares/jwtSign'
import { createUser } from '../controllers/users'

const router: Router = Router()

router.post(
  '/register',
  [
    matchedData,
    ...registerValidator,
    passwordValidator,
    passwordEncryptor,
    adminValidator,
    jwtSign,
  ],
  async (req: Request, res: Response) => {
    try {
      if (!validationResult(req).isEmpty()) {
        const errors = validationResult(req).array()
        return res.status(400).send({ errors })
      }

      req.body.password = res.locals.password

      const insertId = await createUser(req.body)
      insertId
        ? res.json({ accessToken: res.locals.accessToken })
        : res.send(`Nothing inserted User name already exists`)
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
)

router.post(
  '/login',
  [
    matchedData,
    ...loginValidator,
    adminValidator,
    jwtSign,
  ],
  async (req: Request, res: Response) => {
    try {
      if (!validationResult(req).isEmpty()) {
        const errors = validationResult(req).array()
        return res.status(400).send({ errors })
      }
      res.send({ accessToken: res.locals.accessToken })
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
)

export default router