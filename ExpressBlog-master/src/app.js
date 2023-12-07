import express from 'express';
import cors from 'cors';

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Post } from './models/post.js';
import { Comment } from './models/comment.js';
import { Author } from './models/author.js';

import { authors, posts, comments } from './dataset.js';

const app = express();
app.use(cors());
app.use(express.json());

const mongoServer = await MongoMemoryServer.create();
const uri = mongoServer.getUri();

export async function connectDB(){
    await mongoose.connect(uri);
    console.log('Database connected!');
}

app.get('/posts', async (req, res) => {
    // Populate author field and sort by createdAt descending
    let posts = await Post.find({}).populate('author').sort({ createdAt: -1 });

    // Add to the posts the comments count
    posts = await Promise.all(posts.map(async post => {
        const comments = await Comment.countDocuments({ postId: post._id });
        return { ...post._doc, comments };
    }));

    res.json(posts);
});

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate('author');
    res.json(post);
});

app.delete('/post/:id', async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    await Comment.deleteMany({ postId: id });
    res.json({ message: 'Post deleted!' });
});

app.post('/post', async (req, res) => {
    const { title, author, content, tags } = req.body;
    const post = new Post({ title, author, content, tags });
    await post.save();
    res.json(post);
});

app.put('/post/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, content, tags } = req.body;
    const post = await Post.findByIdAndUpdate(id, { title, author, content, tags });
    res.json(post);
});

app.post('/comment/:postId', async (req, res) => {
    const { postId } = req.params;
    const { author, content } = req.body;
    const comment = new Comment({ postId, author, content });
    await comment.save();
    res.json(comment);
});

app.get('/commentsbypost/:postId', async (req, res) => {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).populate('author').sort({ createdAt: -1 });
    res.json(comments);
});

app.listen(5001, async () => {
    console.log('Server is running on port 5000');
    await connectDB();

    // Create sample data
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Author.deleteMany({});

    await Author.insertMany(authors);
    await Post.insertMany(posts);
    await Comment.insertMany(comments);
});