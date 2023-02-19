import mongoose, {Schema} from "mongoose";

const CommentModel = new Schema({
    content: {
        type: String,
        required: false,
        unique: false
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    forPost: {
        type: mongoose.Schema.Types.ObjectId,
    }


}, {timestamps: true})

export default mongoose.model("Comment", CommentModel)