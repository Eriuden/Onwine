import React, { useState } from 'react';
import { addComment, getWine } from '../../redux/actions/wine.actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { EditDeleteComment } from './EditDeleteComment';
import { isEmpty } from '../../utils';

export const Comments = ({props}) => {
  const [text, setText] = useState("")
  const user = useSelector((state) => state.userReducer)
  const users = useSelector((state)=> state.usersReducer)
  const dispatch = useDispatch()

  const handleComment = (e) => {
    e.preventDefault()

    if (text) {
      dispatch(addComment(props._id, user._id, text, user.name))
        .then(()=> dispatch(getWine()))
        .then(()=> setText(""))
    }
  }

  return (
    <div>
      {props.comments.map((comment)=> {
        return (
          <div key={comment._id}>

            <div>
              <img src={!isEmpty(users[0]) && 
              users.map((user)=> {
                if(user._id === comment.commenterId) return user.picture
                else return null
              })
              .join("")
              }
              />
            </div>

            <div>
              <h3>{comment.commenterName}</h3>
            </div>
            <p>{comment.text}</p>
            <EditDeleteComment props={comment} wineId = {props._id}/>

          </div>
        )
      })}

      {
        user._id && (
          <form action='' onSubmit={handleComment}>
            <input 
              type="text"
              name='text'
              onChange={(e)=> setText(e.target.value)}
              value={text}
              placeholder="laisser un commentaire"
            />
            <br/>
            <input type="submit" value="Envoyer" />
          </form>
        )
      }
    </div>
  )
}
