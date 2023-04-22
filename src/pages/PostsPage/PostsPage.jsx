import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from '../../api';

export default function PostsPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        API.get('posts')
            .then(resp => setPosts(resp.data));
    }, []);

    
    const handleDeletePost = (postId) => {
        API.delete(`posts/${postId}`)
            .then(resp => {
                const updatedPosts = posts.filter(post => post.id !== postId);
                setPosts(updatedPosts);
            })
            .catch(error => console.error("Ошибка при удалении поста:", error));
    }

    return (
        <ul>
            {posts.map(p =>
                <li key={p.id}>
                    <button onClick={() => handleDeletePost(p.id)}>Delete Post</button>
                    <Link to={`/posts/${p.id}`}>{p.title}</Link>
                </li>
            )}
        </ul>
    )
};
