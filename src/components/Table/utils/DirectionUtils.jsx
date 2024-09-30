import React, { useEffect } from 'react'
import { useDirectionsContext } from '../../../providers'

export const DirectionName = ()=> {
const {fetchActualDirectionName}= useDirectionsContext()
const name = fetchActualDirectionName.data.name;


    useEffect(() => {
    }, [name]);

  return (
    <h2>La direction : {name}</h2>
  )
}
