import React from 'react'

function OnePicture() {
  return (
    <div className="card" style={{margin: 1+ "em"}}>
        <img 
        className="card-img-top" 
        src="https:/picsum.photos/200" 
        alt="Slika"
        />
        <div className="card-body">
        <h3 className="card-title">Picture name</h3>
        <p className="card-text">This is description of the picture.</p>
        </div>
        <button className="btn">+</button>
    </div>
  );
}

export default OnePicture;