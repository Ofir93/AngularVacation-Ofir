import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  const matchedData = ['user_name', 'password']
  if (req.url === '/register' || req.url === '/register/')
  //  matchedData.push('role', 'username')
  matchedData.unshift('first_name', 'last_name')
  for (const key in req.body) {
    if (!matchedData.includes(key)) {
      return res.status(400).send({ errors: [`Invalid property ${key}`] })
    }
  }
  next()
}