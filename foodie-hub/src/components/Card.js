import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import moment from 'moment';


const Card = (props) =>  {

  const duration = moment(props.created_at).fromNow();

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <Link to={'view/'+ props.id}><h3 className="title">{props.title}</h3></Link>
          <p className="upvotes">{props.upvote + " Upvotes"}</p>
          <p className='time_created'>Created {duration}</p>
      </div>
  );
};

export default Card;