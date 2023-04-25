import React, { useState } from 'react';
import { supabase } from '../client';
import './CreatePost.css';

const CreatePost = () => {
    const [post, setPost] = useState({
        title: '',
        content: '',
        image: '',
        upvote : 0,
        secret_code : '',
        comments : ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };

    const createPost = async (event) => {
        event.preventDefault();

        await supabase
            .from('posts')
            .insert({ title: post.title, content: post.content, image: post.image, upvote: post.upvote, secret_code : post.secret_code, comments : post.comments})
            .select();

        window.location = '/';
    };

    return (
        <div>
            <form onSubmit={createPost}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br />

                <label htmlFor="content">Content</label><br />
                <input type="text" id="content" name="content" value={post.content} onChange={handleChange} /><br />
                <br />

                <label htmlFor="url">Image Url</label><br />
                <input type="text" id="img_url" name="image" value={post.image} onChange={handleChange} /><br />
                <br />

                {/*
                    <label htmlFor="secret_code">Secret Code - Used to Modify Your Posts </label><br />
                <input type="text" id="secret_code" name="secret_code" value={post.secret_code} onChange={handleChange} /><br />
                <br />
    */}

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CreatePost;