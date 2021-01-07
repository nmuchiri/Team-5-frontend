import React, { useState, useEffect } from 'react'
import authHeader from '../../utilities/authHeader.utilities'
import axios from 'axios'
import CommentsList from './CommentsList'
import CommentForm from './CommentForm'
import {saveComment} from '../../services/event.service'


const MyEvent = (params) => {

    const [event, setEvent] = useState('')
    const [comments, setComments]= useState([])

    const eventId=(params.match.params.id)
        
        useEffect( ()=>{
            axios.get(`http://localhost:8080/events/comments/${eventId}`, { headers: authHeader() })
            .then(res=>{
                setEvent(res.data)
                setComments(res.data.comments)
            },
            (error) => {
                return(error)
            }
        )},[])

        const addToList = (newComment) =>{
            setComments([ newComment, ...comments])
        }

    return (
      <div className="container">
        <p>Event: {event.name} </p>
        <p>date: {event.date} </p>
        <p>eventId: {event.eventId}</p>
        <p>location: {event.location}</p>
        __v: {event._v}/_id: {event._id}
        
        <h6>Comments: </h6>
        < CommentsList 
            comments= {comments}
        />
        < CommentForm 
            eventId= {eventId}
            saveComment = {saveComment}
            addToList = {addToList}
        />
        <form>
  <label>
    Comments:
    <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <button onClick={MyEvent}>DELETE COMMENT</button>
      <form method="DELETE" onSubmit={handleDelete}>
        <input hidden type="text" name="eventId" value={event.eventId} />
        <input hidden type="text" name="name" value={event.name} />
        <input hidden type="text" name="date" value={event.date} />
        <input hidden type="text" name="location" value={event.location} />
        <ButtonSpinner text="Delete From Calendar" />
      </form>
    </div>
  );
};





export default MyEvent;