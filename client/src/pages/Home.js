import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import { WineCard } from '../components/WineCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { getWine } from '../../../server/controllers/wine.controller';
import { isEmpty } from '../utils';

export const Home = () => {
  const [loadWine, setLoadWine] = useState(false)
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const wines = useSelector((state)=> state.allWinesReducer)

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadWine(true)
    }
  }

  useEffect(()=> {
    if (loadWine) {
      dispatch(getWine(count))
      setLoadWine(false)
      setCount(count+12)
    }

    window.addEventListener("scroll", loadMore)
  }, [loadWine, dispatch, count])

  return (
    <div>
      <div>
        <ul>
          {!isEmpty(wines[0]) &&
          wines.map((wine)=> {
            return <WineCard props={wine} key={wine._id}/>
          })}
        </ul>
      </div>
    </div>
  )
}
