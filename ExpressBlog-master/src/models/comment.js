import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId: mongoose.Schema.Types.ObjectId,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    content: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export const Comment = mongoose.model('Comment', commentSchema);