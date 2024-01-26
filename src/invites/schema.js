import database from "../../globals/config/database.js";
import mongoose, {Schema} from "mongoose";

const schema = new Schema({
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: "Organization",
        required: true
    },
    invitedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    inviteTo: {
        type: String,
        required: true,
        unique: true
    },
    expiresIn: {
        type: Date,
        required: true
    },
    inviteCode: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

const Invites = database.model("invites", schema);

export default Invites;