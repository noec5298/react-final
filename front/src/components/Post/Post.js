import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

export default function Post(props) {
    const { _id, title, author, content, createdAt, comments } = props;
    console.log(props)
    return (
        <Link to={`/post/${_id}`} className="post">
            <div className="postCard">
                <h2>{title}</h2>
                <h3>{author.name} | {createdAt}</h3>
                <p>{content}</p>
                <p>Comments: {comments}</p>
            </div>
        </Link>
    )
}