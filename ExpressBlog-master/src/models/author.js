import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: String,
    email: String
});

export const Author = mongoose.model('Author', authorSchema);