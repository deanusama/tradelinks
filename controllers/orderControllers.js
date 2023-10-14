import GuestOrder from "../models/guestOrder.js";
import { StatusCodes } from "http-status-codes";


export const addGuestOrder = async (req, res) => {

    const { files, body } = req

    const { firstName, lastName, additionalDriverName, carApiData: rawCarApiData, secondaryID } = body
    // const insuranceTT = { type, term }
    const parsedCarApiData = JSON.parse(rawCarApiData)
    const { insuranceTT, ...rest } = parsedCarApiData

    const carApiData = { ...rest }
    const licenseOrMulkiaPhotos = files.map(file => ({ name: file.path }))


    try {
        const guestOrder = await GuestOrder.create(
            { firstName, lastName, additionalDriverName, insuranceTT, carApiData, licenseOrMulkiaPhotos, secondaryID }
        )
        res.status(StatusCodes.OK).json({ guestOrder })
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
    }

}

export const getAllGuestOrder = async (req, res) => {
    const { firstName, lastName } = req.query

    if (firstName && lastName) {

        try {
            const singleOrder = await GuestOrder.findOne({
                firstName,
                lastName
            }).select(" carApiData licenseOrMulkiaPhotos")
            res.status(StatusCodes.OK).json({ singleOrder })

        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json(
                { error: 'Error retrieving single order', msg: error.message }
            );
        }

    } else {

        try {
            const allGuestOrders = await GuestOrder
                .find({})
                .select(" firstName lastName vehicleValue insuranceTT approval secondaryID")

            res.status(StatusCodes.OK).json({ allGuestOrders })

        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json(
                { error: 'Error retrieving all guest orders', msg: error.message }
            );


        }
    }

}

export const updateApprovalGuestOrder = async (req, res) => {
    const { secondaryID, approval } = req.body

    try {
        const updatedApprovalOfOrder = await GuestOrder.findOneAndUpdate(

            { secondaryID },
            { $set: { approval } },
            { new: true })

        res.status(StatusCodes.OK).json({ updatedApprovalOfOrder })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })

    }
}

export const addComprehensiveOrder = async (req, res) => {

    const { body, files } = req
    const licenseOrMulkiaPhotos = files.map(file => ({ name: file.path }))
    const { secondaryID, insuranceTT: rawInsuranceTT } = body
    const insuranceTT = JSON.parse(rawInsuranceTT)

    try {

        const guestOrder = await GuestOrder.create({ insuranceTT, secondaryID, licenseOrMulkiaPhotos })
        res.status(StatusCodes.OK).json({ guestOrder })

    } catch (error) {

        console.log(error);
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })
    }

}