import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // READ all post from table
    const fetchPosts = async () => {
        const {data} = await supabase
            .from('posts')
            .select()
            .order('created_at', { ascending: true })

        // set state of posts
        setPosts(data);
    }
    fetchPosts();
        }, [props]);
        
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card id={post.id} title={post.title} content={post.content} upvote={post.upvote} />
                ) : <h2>{'No Posts Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;