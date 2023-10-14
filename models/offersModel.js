

import mongoose, { Schema } from "mongoose";


const offersSchema = new Schema({

    offerFor: String,
    omanOnlyArr: [{

        offerFor: String,
        name: String,
        age: String,
        passengers: String,
        estimatedValue: String,
    }],
    omanUaeArr: [{

        offerFor: String,
        name: String,
        age: String,
        passengers: String,
        estimatedValue: String,
    }],
    omanGccArr: [{

        offerFor: String,
        name: String,
        age: String,
        passengers: String,
        estimatedValue: String,
    }]
})


const Offers = mongoose.model('Offers', offersSchema)
export default Offers