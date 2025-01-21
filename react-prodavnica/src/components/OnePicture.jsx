import React from "react";
import { FaPlus } from "react-icons/fa";

function OnePicture({ picture, onAdd, inCart }) {
  return (
    <div
      className={inCart === 1 ? "cardP" : "card-cart"}
      style={{ margin: 2 + "em" }}
    >
      <img
        className={inCart === 1 ? "cardP-img-top" : "card-img-left"}
        src="https:/picsum.photos/200"
        alt="Slika"
      />
      <div className="card-body">
        <h3 className="card-titleP" style={{ color: "#5e2c71" }}>
          {picture.title}
        </h3>
        <p className="card-text">{picture.description}.</p>
        <p className="card-price">{picture.price} EUR</p>
      </div>
      {inCart === 1 ? (
        <button
          className="btnP"
          onClick={() => onAdd(picture.title, picture.id, picture.amount)}
          style={{
            backgroundColor: "black",
            borderColor: "black",
            color: "white",
          }}
        >
          Add to cart
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default OnePicture;
