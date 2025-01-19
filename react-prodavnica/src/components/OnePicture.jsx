import React from 'react'
import { FaPlus } from "react-icons/fa";

function OnePicture({picture, onAdd, inCart}) { 
  return (
    <div className={inCart===1 ? "card" : "card-cart"} style={{margin: 2+ "em"}}>
        <img 
        className={inCart===1 ? "card-img-top" : "card-img-left"} 
        src="https:/picsum.photos/200" 
        alt="Slika"
        />
        <div className="card-body">
        <h3 className="card-title">{picture.title}</h3>
        <p className="card-text">{picture.description}.</p>
        <p className="card-price">{picture.price} EUR</p>
        </div>
        {inCart === 1 ? <button className="btn" onClick={()=>onAdd(picture.title, picture.id, picture.amount)}>Add to cart</button> : <></>}
        
    </div>
  );
}

export default OnePicture;