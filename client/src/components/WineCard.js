import React, {useState, useEffect} from 'react'
import {useSelector} from "react-redux"
import { isEmpty } from '../utils'
import { DeleteWineCard } from './DeleteWineCard'
import { LikeButton } from './LikeButton'

export const WineCard = ({props}) => {

  const [isLoading, setIsLoading] = useState(true)
  const wines = useSelector((state)=> state.allWinesReducer)
  const user = useSelector((state)=> state.userReducer)

  useEffect(()=> {
    !isEmpty(wines[0]) && setIsLoading(false)
  }, [ wines])

  return (
    <div key={props._id}>
      {isLoading ? (
        <i className='fas-fa-spinner fa-spin'></i>
      ): (
        <>
          <div>

            <img src={!isEmpty(wines[0]) &&
              wines
              .map((wine)=> {
                if (wine._id) return wine.picture
                else return null
              })}
            />

            <h3>
              {isEmpty(wines[0]) &&
                wines
                .map((wine)=> {
                  if (wine._id) return wine.name 
                  else return null 
                })
                .join("")}
            </h3>

          </div>
        </>
      )}
      {
        user._id === props.id && (
          <DeleteWineCard id={props._id}/>
        )
      }

      <div>
        <LikeButton props={props}/>
      </div>
      
    </div>
  )
}
