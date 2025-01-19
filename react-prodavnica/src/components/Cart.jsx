import React from 'react'
import OnePicture from './OnePicture'

const Cart = ({pictures}) => {
  return (
    <div className="cart-container">
        <h3>This is your cart</h3>
        {pictures.map((pic) => ( 
      <OnePicture picture = {pic} key={pic.id} inCart={0}/>
    ))}
    </div>
  )
}

export default Cart