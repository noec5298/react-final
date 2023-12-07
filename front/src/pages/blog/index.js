import React, { useEffect, useState } from "react"
import "./styles.scss"
import Post from "../../components/Post/Post";

export default function Blog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchComments = async (postId) => {
            const response = await fetch(`http://localhost:5001/commentsbypost/${postId}`);
            const data = await response.json();

            return data.length;
        }

        const fetchPosts = async () => {
            const response = await fetch("http://localhost:5001/posts");
            const data = await response.json();

            // Convert date to dateString in dd/mm/yyyy format
            await data.forEach(async (post) => {
                const date = new Date(post.createdAt);
                const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                post.createdAt = dateString;
            });

            console.log(data)

            setPosts(data);
        }
        fetchPosts();
    }, []);

    return (
        <div className="blog">
            <h1>Blog</h1>
            <div className="posts">
                {posts.map((post) => (
                    <Post key={post._id} {...post} />
                ))}
            </div>
        </div>
    )
}