import express from 'express'
const authRouter = express.Router()
// import router from Router
import {
    signup,
    login, 
    getMe, 
    updateProfile
} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'

authRouter.post('/signup', signup)
authRouter.post('/login',  login)
authRouter.get('/me', protect, getMe)
authRouter.put('/profile', protect, updateProfile)

export default authRouter