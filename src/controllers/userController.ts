import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../models/User'
import bcrypt from 'bcryptjs'

const userRepository = AppDataSource.getRepository(User)

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
  })
  await userRepository.save(user)
  return res.status(201).json(user)
}

export const getUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find()
  return res.json(users)
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await userRepository.findOneBy({ id })
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  return res.json(user)
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, email } = req.body
  const user = await userRepository.findOneBy({ id })
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  user.name = name
  user.email = email
  await userRepository.save(user)
  return res.json(user)
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await userRepository.findOneBy({ id })
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  await userRepository.remove(user)
  return res.status(204).send()
}
