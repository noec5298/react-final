import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    content: String,
    tags: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export const Post = mongoose.model('Post', postSchema);