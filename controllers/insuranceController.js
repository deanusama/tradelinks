import { StatusCodes } from "http-status-codes";
import Insurance from "../models/insuranceModel.js";


export const addInsurance = async (req, res) => {


    const { file, body } = req
    const { title, offerFor: offerForRaw } = body
    const offerFor = JSON.parse(offerForRaw)

    const insuranceImage = file?.path

    try {
        const insurance = await Insurance.create({ title, offerID: offerFor._id, insuranceImage })

        res.status(StatusCodes.OK).json({ insurance })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })

    }

}

export const getAllInsurance = async (req, res) => {

    try {
        const insurances = await Insurance.find({}).populate('offerID').lean()
        res.status(StatusCodes.OK).json({ insurances })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })

    }

}

export const editInsurance = async (req, res) => {

    const { id } = req.params
    const insuranceImage = req.file?.path
    const { offerID, title } = req.body

    try {

        const insurance = await Insurance.findOne({ _id: id })

        if (!insurance) {
            throw new Error(`No insurance with with ID ${id}`)
        }


        if (req.file === undefined) {

            const updatedInsurance = await Insurance.findOneAndUpdate(
                { _id: id },

                req.body,

                { new: true, runValidators: true })

            res.status(StatusCodes.OK).json({ updatedInsurance })


        } else {

            const updatedInsurance = await Insurance.findOneAndUpdate(
                { _id: id },
                {
                    title, insuranceImage, offerID
                },
                { new: true, runValidators: true })

            res.status(StatusCodes.OK).json({ updatedInsurance })

        }



    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })


    }
}

export const deleteSelectedInsurances = async (req, res) => {

    const selectedIDs = req.body
    try {

        await Insurance.deleteMany({ _id: { $in: selectedIDs } })
        res.status(StatusCodes.OK).json({ message: "Insurances deleted successfully", selectedIDs })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
    }
}