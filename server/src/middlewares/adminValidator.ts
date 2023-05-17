import bcrypt from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'
import { Document } from 'mongoose'
import { readFile } from 'fs/promises'
import { Iadmin } from '../interfaces/admin'
import { Iuser } from '../interfaces/user'
import { findAdmins } from '../controllers/admin'
import { findUsers } from '../controllers/users'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const admins = await findAdmins({userName: req.body.user_name})
    const users = await findUsers({})

    const adminExisted: Iadmin[] = admins.filter(
      (admin: Iadmin) =>
        req.url === '/login' && admin.user_name === req.body.user_name
        )

    const userExisted: Iuser[] = users.filter(
          (user: Iuser) => req.url === '/login' && user.user_name === req.body.user_name
        )
        if (adminExisted.length) {
          const isValidPwd = await bcrypt.compare(
            req.body.password,
            adminExisted[0].password
          )
          if (!isValidPwd) {
            return res.sendStatus(401)
          }
          req.body.role = 'admin'
        }

        if (userExisted.length) {
          const isValidPwd = await bcrypt.compare(
            req.body.password,
            userExisted[0].password
          )
          req.body.id = userExisted[0].id
          req.body.role = 'user'
          if (!isValidPwd) {
            return res.sendStatus(401)
          }
        }
        if (!userExisted.length && !adminExisted.length && req.url === '/register') {
          req.body.role = 'user'
          req.body.id = ++users.length  
        }
        
        if (!userExisted.length && !adminExisted.length && req.url === '/login') {
          return res.status(400).send({ errors: ['username not registered please try again or register'] })
        }  

        next()
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}