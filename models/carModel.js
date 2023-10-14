import mongoose, { Schema } from "mongoose";


const carSchema = new Schema({

    name: String,
    color: String,
    highlights: String,
    cylinders: String,
    transmission: String,
    drive: String,
    fuel: String,
    model: String,
    seats: String,
})



const Car = mongoose.model('Car', carSchema)
export default Car