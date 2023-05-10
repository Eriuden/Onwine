import React, { useState, useEffect, useContext} from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../redux/actions/wine.actions';
import { UidContext } from '../AppContext';

export const EditDeleteComment = ({props, wineId}) => {
  const [isAuthor, setIsAuthor] = useState(false)
  const [edit, setEdit] = useState(false)
  const [ text, setText] = useState(false)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const handleEdit = (e)=> {
    e.preventDefault()

    if (text) {
      dispatch(editComment(wineId, props._id, text))
      setText("")
      setEdit(false)
    }
  }

  const handleDelete = () => {
    dispatch(deleteComment(wineId, props._id))
  }

  useEffect(()=> {
    const checkAuthor = () => {
      if (uid === props.commenterId) {
        setIsAuthor(true)
      }
    }
    checkAuthor()
  }, [uid, props._id])

  return (
    <div>
      {isAuthor && edit && (
        <form action='' onSubmit={handleEdit}>
          <label htmlFor='text' onClick={()=> setEdit(!edit)}>
            Editer
          </label>
          <br/>
          <input type="text" name='text' onChange={(e)=> setText(e.target.value)}
          defaultValue={props.text} />
          <br/>

          <div>
            <span onClick={()=> {
              if (window.confirm("Voulez vous supprimer ce commentaire ?"))
              handleDelete()
            }}>
              <img src='../img/icons/trash.svg' alt='supprimer' />
            </span>
          </div>
        </form>
      )}
    </div>
  )
}
