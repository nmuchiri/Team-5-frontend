import React, { useState, useEffect } from 'react';
import  axios  from 'axios';
// import { Link } from 'react-router-dom'
import authHeader from '../utilities/authHeader.utilities'
import { updateComment } from '../services/event.service'
require('dotenv').config();


const UpdateComment = (params) => {
    //console.log(params)
    //axios call the fetches the comment to be edited and prepopulates it on the form
    const [savedComment, setSavedComment] = useState("")
    const eventId=(params.match.params.id)
    console.log(eventId)
    // we get comments at eventId
    useEffect(() => {
      var API_URL 
      {process.env.NODE_ENV === 'development' ? API_URL=process.env.REACT_APP_DEV_URL_LOCAL_DB : API_URL=process.env.REACT_APP_PRO_PRO_HEROKU_DB}
        axios.get(`${API_URL}getComment/${eventId}`, {headers: authHeader()}) 
          .then((res) => {
              console.log(res.data)
            setSavedComment(res.data[0])
          })
      }, [eventId])
 console.log(savedComment)

  const [updatedComment, setUpdatedComment] = useState("")

  console.log(updatedComment)
 
  const handleSubmit = (e) => {
    e.preventDefault()
    updateComment(
            savedComment.name,
            updatedComment.content,
            savedComment._id
    )
}
// this function handles the update axios call and goes on the edit comment button on the comments component
  function handleUpdate(event) {
    setUpdatedComment({ [event.target.name]: event.target.value})
  }

// function that lets you cancel if you don't want to edit comment
//   function handleCancel() {
//     props.history.push("/comments/5ff394c7d87802b5b25b5021");
//   }

  return (
    <div>
      <h1>Edit Comment</h1>
      
      <hr/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Content</label>
          <textarea name="content" rows="5" value={updatedComment=== "" ? savedComment.content : updatedComment.content } onChange={handleUpdate} className="form-control" />
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" onClick className="btn btn-secondary">handle Cancel goes here</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateComment