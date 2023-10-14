import express from 'express'
import { addCar } from '../controllers/carControllers.js'

const router = express.Router()


router.post('/', addCar)

export default router