import 'reflect-metadata'
import express from 'express'
import { AppDataSource } from './data-source'
import userRoutes from './routes/userRoutes'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/users', userRoutes)

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000')
    })
  })
  .catch((error) => console.log(error))
