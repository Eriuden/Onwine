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
    /* window.innerHeight = hauteur intérieure de la fenètre en px
     document.documentElement.scrollTop = en px aussi,
     à combien de px on est du haut de l'élément parent principal de la page
     sachant qu'on est plus en haut, et bien, si on scroll
     scrollingElement c'est l'élement qui fait défiler le doc
     C'est en quelque sorte documentElement mais dans le contexte d'un scroll
     scrollHeight, la hauteur dont il a besoin pour tout afficher
     de cette manière, il évitera de charger les cartes 
     AVANT que l'on ait scrollé jusqu'au bout
     puisque il faut dépasse la hauteur minimale calculée de l'élément 
    */
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
