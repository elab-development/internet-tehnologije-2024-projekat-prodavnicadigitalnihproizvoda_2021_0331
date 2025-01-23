import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function OnePicture({
  picture,
  onAdd,
  onPictureClick,
  isFavorite,
  toggleFavorite,
}) {
  return (
    <div className="card">
      <div
        className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
        data-mdb-ripple-color="light"
        onClick={() => onPictureClick(picture)}
        style={{ cursor: "pointer" }}
      >
        <img
          src="https:/picsum.photos/200"
          className="w-100"
          alt={picture.title}
        />
        <a href="#!">
          <div className="mask"></div>
          <div className="hover-overlay">
            <div
              className="mask"
              style={{
                backgroundColor: "rgba(251, 251, 251, 0.15)",
              }}
            ></div>
          </div>
        </a>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-2">{picture.title}</h5>
          <button
            className="btn btn-link p-0"
            onClick={() => toggleFavorite(picture)}
            style={{ color: isFavorite ? "red" : "gray" }}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <p>Category: {picture.category}</p>

        <h6 className="mb-3">{picture.price}$</h6>
        <button
          className="btn btn-primary"
          onClick={() => onAdd(picture.id, picture.title, picture.price)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default OnePicture;
