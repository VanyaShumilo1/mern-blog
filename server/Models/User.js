import mongoose, {Schema} from "mongoose";

const UserModel = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatarUrl: String
}, {timestamps: true})

export default mongoose.model("User", UserModel)