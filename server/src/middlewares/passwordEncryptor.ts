import { Request, Response, NextFunction } from 'express' 

import bcrypt from 'bcryptjs'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(req.body.password, salt)

        res.locals.password = hash
        next()
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}