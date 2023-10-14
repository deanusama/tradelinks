import express from 'express'
import { addOffer, deleteSelectedOffers, editOffer, getAllOffers } from '../controllers/offersController.js'

const router = express.Router()


router.post('/', addOffer)
router.get('/', getAllOffers)
router.patch('/:id', editOffer)

router.post('/delete', deleteSelectedOffers)


export default router