import React from 'react'
import { useParams } from 'react-router-dom'

function ProductScreen() {
    const params = useParams(); //to extact the parameter from the route in the home Screen component
    const {slug} = params; // slug est le parameter
  return (
    <div>
    <h1>{slug}</h1>
    
    </div>

  )
}

export default ProductScreen