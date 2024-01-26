import database from "../../globals/config/database.js";
import mongoose, {Schema} from "mongoose";

const addressSchema = new Schema({
    addressLine: {
        type: String
    },
    pincode: {
        type: Number,
    },
    city: {
      type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
})

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    address: addressSchema,
    organizationCode: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    ownedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
})

const Organization = database.model('Organizations', schema);

export default Organization;



