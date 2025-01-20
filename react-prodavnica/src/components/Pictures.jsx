import React from "react";
import OnePicture from "./OnePicture.jsx";

const Pictures = ({ pictures, onAdd }) => {
  return (
    <div className="all-productsP">
      {pictures.map((pic) => (
        <OnePicture picture={pic} key={pic.id} onAdd={onAdd} inCart={1} />
      ))}
    </div>
  );
};

export default Pictures;
