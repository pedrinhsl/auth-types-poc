import { Router } from 'express'
import { registerUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController'
import { apiKeyAuthentication, basicAuthentication, jwtAuthentication } from '../middlewares'

//apiKeyAuthentication, basicAuthentication, jwtAuthentication
const auth = jwtAuthentication

const router = Router()

router.post('/register', registerUser)
router.get('/', auth, getUsers)
router.get('/:id', auth, getUserById)
router.put('/:id', auth, updateUser)
router.delete('/:id', auth, deleteUser)

export default router
