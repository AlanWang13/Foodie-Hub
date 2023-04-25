import React , {useState} from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../client'

const EditPost = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState(data.filter(item => item.id == id)[0]);
    

    const updatePost = async(event) => {
        event.preventDefault();

        await supabase
        .from('posts')
        .update({ title: post.title, content: post.content, image: post.image, upvote: post.upvote, secret_code : post.secret_code, comments : post.comments})
        .eq('id', id);
    
        window.location = "/";
    }

     // DELETE post
     const deletePost = async (event) => {
        event.preventDefault();

        await supabase
        .from('posts')
        .delete()
        .eq('id', id);

        window.location = "/";
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value
        }));
    }

    return (
        <div>
            <form onSubmit={updatePost}>
            <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br />

                <label htmlFor="content">Content</label><br />
                <input type="text" id="content" name="content" value={post.content} onChange={handleChange} /><br />
                <br />

                <label htmlFor="url">Image Url</label><br />
                <input type="text" id="img_url" name="image" value={post.image} onChange={handleChange} /><br />
                <br />

                
                {/*<label htmlFor="secret_code">Secret Code - Used to Modify Your Posts </label><br />
                <input type="text" id="secret_code" name="secret_code" value={post.secret_code} onChange={handleChange} /><br />
                <br />*/}

                <input type="submit" value="Submit"/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost