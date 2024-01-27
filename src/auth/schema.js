import mongoose, {Schema} from "mongoose";
import database from "../../globals/config/database.js";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    countryCode: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    organization: {
        type: mongoose.Types.ObjectId,
        ref: 'Organizations'
    },
    designation: {
        type: mongoose.Types.ObjectId,
        ref: "Designation"
    },
    documents: {
        type: mongoose.Types.ObjectId,
        ref: "Documents"
    },
    lastLoggedIn: {
        type:  Date,
    },
    isActive: {
        type: Boolean,
    },
    permissions: {type: [String] }
});

const User = database.model("User", schema)

export default User;