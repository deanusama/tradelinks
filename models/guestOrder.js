import mongoose, { Schema, model } from "mongoose";



const insuranceTTSchema = new Schema({

    term: String,
    type: String,
})

const carAPIDataSchema = new Schema({

    term: String,
    city_mpg: String,
    class: String,
    combination_mpg: String,
    cylinders: String,
    displacement: String,
    drive: String,
    fuel_type: String,
    highway_mpg: String,

    make: String,
    model: String,
    transmission: String,
    year: String,
})

const guestOrderSchema = new Schema({

    secondaryID: String,
    firstName: String,
    lastName: String,
    additionalDriverName: String,
    insuranceTT: insuranceTTSchema,
    carApiData: carAPIDataSchema,
    vehicleValue: String,

    approval: {
        type: String,
        enum: ['Accept', 'Pending', 'Reject'],
        default: 'Pending'
    },

    licenseOrMulkiaPhotos: [{
        name: String,
    }],

    createdAt: {
        type: Date,
        default: Date.now
    }
})


const GuestOrder = mongoose.model('guestOrder', guestOrderSchema)
export default GuestOrder