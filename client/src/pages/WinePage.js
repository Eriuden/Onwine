import React, {useEffect} from 'react';
import { getWine } from '../redux/actions/wine.actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Comments } from '../components/comments/Comments';


export const WinePage = () => {
  const wine = useSelector((state)=> state.wineReducer)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getWine(wine._id))
  })

  return (
    <div>
      <h2>{wine.wineName}</h2>
      <img src={wine.picture}/>
      <h3>{wine.year}</h3>
      <h3>{wine.cépage}</h3>

      <div>
        <Comments props={wine}/>
      </div>
    </div>
  )
}
