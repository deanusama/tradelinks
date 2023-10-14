import Offers from "../models/offersModel.js"
import { StatusCodes } from "http-status-codes";


export const addOffer = async (req, res) => {

    try {
        const offer = await Offers.create(req.body)
        res.status(StatusCodes.OK).json({ offer })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })

    }

}

export const getAllOffers = async (req, res) => {

    try {
        const offers = await Offers.find({})
        res.status(StatusCodes.OK).json({ offers })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })

    }

}


export const deleteSelectedOffers = async (req, res) => {

    console.log(req.body);
    const selectedIDs = req.body

    try {

        await Offers.deleteMany({ _id: { $in: selectedIDs } })
        res.status(StatusCodes.OK).json({ message: "Offers deleted successfully", selectedIDs })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
    }

}

export const editOffer = async (req, res) => {
    const { id } = req.params


    try {

        const offer = await Offers.findOne({ _id: id })

        if (!offer) {
            throw new Error(`No Offer with with ID ${id}`)
        }

        const updatedOffer = await Offers.findOneAndUpdate({ _id: id }
            , { $set: req.body },
            { new: true, runValidators: true })

        res.status(StatusCodes.OK).json({ updatedOffer })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
    }

}