import { DataSource } from 'typeorm'
import { User } from './models/User'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'myuser',
  password: 'mypassword',
  database: 'poc_auth_crud',
  entities: [User],
})
