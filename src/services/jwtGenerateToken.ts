import jwt from 'jsonwebtoken'
import { User } from '../models/User'

export const generateToken = (user: User) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
}
