import { StatusCodes } from "http-status-codes";
import Car from "../models/carModel.js";



export const addCar = async (req, res) => {

   
    try {


        const car = await Car.create({
            ...req.body,
        });
        res.status(StatusCodes.CREATED).json({ car })


    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message })

    }
}