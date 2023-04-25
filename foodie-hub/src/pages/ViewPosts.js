import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css';
import { supabase } from '../client';

const ViewPost = ({ data }) => {
  const { id } = useParams();
  const [post, setPost] = useState(data.filter((item) => item.id == id)[0]);
  const [newComment, setNewComment] = useState('');

  const updatePost = async (event) => {
    event.preventDefault();

    const updatedComments = (
        <div>
          {post.comments}
          <br />
          -{newComment}
          <br />
        </div>
      );// Concatenate new comment to existing comments
    await supabase.from('posts').update({ comments: updatedComments }).eq('id', id);

    setPost((prevPost) => ({ ...prevPost, comments: updatedComments }));
    setNewComment('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewComment(value);
  };

  return (
    <div className='post'>
      <div className='content_container'>
        <div className='posted'></div>
        <div className='title'>{post.title}</div>
        <img src={post.image} />
        <div className='content'>{post.content}</div>
      </div>
      <div className='comment_container'>
        <div className='comments'>{post.comments}</div>
        <div className='input_comments'>
          <form onSubmit={updatePost}>
            <label htmlFor='comment'>Add Comment</label> <br />
            <input type='text' id='comment' name='comment' value={newComment} onChange={handleChange} />
            <br />
            <input type='submit' value='Submit' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
