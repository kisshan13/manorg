import database from "../../globals/config/database.js";
import mongoose, {Schema} from "mongoose";
import mongoPaginate from "mongoose-paginate-v2"

const schema = new Schema({
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: "Organizations",
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

// Todo: Add Pagination.
const Invites = database.model("invites", schema);

export default Invites;