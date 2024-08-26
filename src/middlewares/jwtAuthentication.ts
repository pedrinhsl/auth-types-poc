import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AppDataSource } from '../data-source'
import { User } from '../models/User'

export const jwtAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token not provided' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    if (typeof decoded === 'object' && 'userId' in decoded) {
      const userRepository = AppDataSource.getRepository(User)
      const user = await userRepository.findOneBy({ id: decoded.userId })
      if (!user) {
        return res.status(401).json({ message: 'User not found' })
      }
      req.user = user
      next()
    } else {
      return res.status(401).json({ message: 'Invalid token' })
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
