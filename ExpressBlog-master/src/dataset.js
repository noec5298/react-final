import mongoose from 'mongoose';

// Create sample authors based on the schema
export const authors = [
    {
        _id: new mongoose.Types.ObjectId(),
        name: 'John Doe',
        email: 'john@doe.com'
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: 'Jane Doe',
        email: 'jane@doe.com'
    }
];


// Create sample posts based on the schema

export const posts = [
    {
        _id: new mongoose.Types.ObjectId(),
        title: 'First Post',
        author: authors[0]._id,
        content: 'This is the first post.',
        tags: ['new', 'tech'],
        createdAt: new Date()
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: 'Second Post',
        author: authors[1]._id,
        content: 'This is the second post.',
        tags: ['old', 'tech'],
        createdAt: new Date()
    }
];

// Create sample comments based on the schema

export const comments = [
    {
        postId: posts[0]._id,
        author: authors[1]._id,
        content: 'This is the first comment.',
        createdAt: new Date()
    },
    {
        postId: posts[1]._id,
        author: authors[0]._id,
        content: 'This is the second comment.',
        createdAt: new Date()
    }
]
