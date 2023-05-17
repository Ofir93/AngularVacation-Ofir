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
    if(req.body.userName === 'admin') {
      const admins = await findAdmins({userName: req.body.userName})

      if (admins.length === 1) {
        // if (adminExisted.length) {
          const isValidPwd = await bcrypt.compare(
            req.body.password,
            admins[0].password
            // adminExisted[0].password
          )
          if (!isValidPwd) {
            return res.sendStatus(401)
          }
          req.body.role = 'admin'
        }

    }
    // const admins = await findAdmins({userName: req.body.userName})
    const users = await findUsers({userName: req.body.userName})

    // const adminExisted: Document<unknown, any, Iadmin>[] = admins.filter(
    // // const adminExisted: Admin[] = admins[0].filter(
    //   (admin: Document<unknown, any, Iadmin>) =>
    //     req.url === '/login' && admin.user_name === req.body.userName
    //     )

    // const userExisted: Document<unknown, any, Iuser>[] = users.filter(
    // // const userExisted: Iuser[] = users[0].filter(
    //       (user: Document<unknown, any, Iuser>) => req.url === '/login' && user.user_name === req.body.userName
    //     )
    
        // if (admins.length === 1) {
        // // if (adminExisted.length) {
        //   const isValidPwd = await bcrypt.compare(
        //     req.body.password,
        //     admins[0].password
        //     // adminExisted[0].password
        //   )
        //   if (!isValidPwd) {
        //     return res.sendStatus(401)
        //   }
        //   req.body.role = 'admin'
        // }

        if (users.length === 1) {
        // if (userExisted.length) {
          const isValidPwd = await bcrypt.compare(
            req.body.password,
            users[0].password
            // userExisted[0].password
          )
          req.body.id = users[0].id
          // req.body.id = userExisted[0].id
          req.body.role = 'user'
          if (!isValidPwd) {
            return res.sendStatus(401)
          }
        }
        
        if (req.body.userName !== users[0].user_name && req.url === '/register') {
        // if (!userExisted.length && !adminExisted.length && req.url === '/register') {
          req.body.role = 'user'
          req.body.id = ++users.length  
          // req.body.id = ++users[0].length  
        }
        
        if (users.length > 1 && req.url === '/login') {
        // if (!userExisted.length && !adminExisted.length && req.url === '/login') {
          return res.status(400).send({ errors: ['username not registered please try again or register'] })
        }  

        next()
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}