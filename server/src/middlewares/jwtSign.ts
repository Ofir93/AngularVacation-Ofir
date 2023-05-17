import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.ACCESS_TOKEN_SECRET) {
      return res.sendStatus(500)
    }

    const { user_name, role, id } = req.body
    jwt.sign(
      { user_name, role, id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '20m' },
      (err: Error | null, accessToken: string | undefined) => {
        if (err) {
          console.error(err)
          return res.sendStatus(500)
        }
        res.locals.accessToken = accessToken
        next()
      }
    )
   
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}