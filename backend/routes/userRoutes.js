import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as userController from '../controllers/userController.js'

const router = express.Router()

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)

export default router
