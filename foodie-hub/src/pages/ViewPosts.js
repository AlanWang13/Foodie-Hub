import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ViewPosts.css';
import { supabase } from '../client';

const ViewPost = ({ data }) => {
  const { id } = useParams();
  const [post, setPost] = useState(data.filter((item) => item.id == id)[0]);
  const [newComment, setNewComment] = useState('');
  const [votes, setVotes] = useState(post.upvote || 0);

  const updatePost = async (event) => {
    event.preventDefault();

    const updatedComments = (
      <div>
        {post.comments}
        - {newComment}
        <br />
      </div>
    );

    await supabase.from('posts').update({ comments: updatedComments, upvote: votes }).eq('id', id);

    setPost((prevPost) => ({ ...prevPost, comments: updatedComments, upvote: votes }));
    setNewComment('');
  };

  const handleVote = async () => {
    const updatedVotes = votes + 1;
    await supabase.from('posts').update({ upvote: updatedVotes }).eq('id', id);
    setVotes(updatedVotes);
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewComment(value);
  };

  return (
    <div className='post'>
      <div className='content_container'>
        <div className='title'>{post.title}</div>
        <img src={post.image} />
        <div className='content'>{post.content}</div>
      </div>
      <hr />
      <div className='comment_container'>
        <div className='comments'>
          <h2>Comments</h2>
          {post.comments}
        </div>
        <div className='input_comments'>
          <form onSubmit={updatePost}>
            <label htmlFor='comment'>Add Comment</label>
            <br />
            <textarea
              id='comment'
              name='comment'
              value={newComment}
              onChange={handleChange}
              placeholder='Write your comment here...'
              rows={5}
              required
            />
            <br />
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
      <hr />
      <div className='votes'>
        <button onClick={handleVote}>Upvote</button>
        <span>{votes}</span>
      </div>
    </div>
  );
};

export default ViewPost;
