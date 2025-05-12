import React from "react";
import OnePicture from "./OnePicture";

const Favorites = ({ favorites, onAdd, toggleFavorite }) => {
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="text-center">
          <h3 className="mb-4">Your Favorite Pictures</h3>
          <br />
          {favorites.length > 0 ? (
            <div className="row">
              {favorites.map((picture, index) => (
                <div key={index} className="col-lg-3 col-md-6 mb-4">
                  <OnePicture
                    picture={picture}
                    onAdd={onAdd}
                    isFavorite={true}
                    toggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
            </div>
          ) : (
            <h4 className="text-muted">You have no favorite pictures yet.</h4>
          )}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
