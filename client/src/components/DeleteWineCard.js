import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteWine } from '../redux/actions/wine.actions';

export const DeleteWineCard = ({props}) => {
  const dispatch = useDispatch()
  const deletWine = ()=> dispatch(deleteWine(props._id))
  return (
    <div onClick={()=> {
        if (window.confirm("Voulez vous supprimer cet article ?")) {
            deletWine()
        }
    }}>
        <img src='../img/icons/trash.svg' alt='fonction supprimer' />
    </div>
  )
}
