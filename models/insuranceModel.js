import mongoose, { Schema } from "mongoose";


const insuranceSchema = new Schema({

    title: String,
    insuranceImage: String,

    offerID: {
        type: Schema.Types.ObjectId,
        ref: 'Offers'
    }
})


const Insurance = mongoose.model('Insurance', insuranceSchema)
export default Insurance