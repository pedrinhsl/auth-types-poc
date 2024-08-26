import { Request, Response, NextFunction } from 'express'
import basicAuth from 'basic-auth'
import bcrypt from 'bcryptjs'
import { AppDataSource } from '../data-source'
import { User } from '../models/User'

export const basicAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  const user = basicAuth(req)
  if (!user || !user.name || !user.pass) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const userRepository = AppDataSource.getRepository(User)
  const foundUser = await userRepository.findOneBy({ email: user.name })
  if (!foundUser || !(await bcrypt.compare(user.pass, foundUser.password))) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  req.user = foundUser
  next()
}
