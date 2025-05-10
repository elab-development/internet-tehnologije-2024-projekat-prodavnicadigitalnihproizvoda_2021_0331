import React, { useState, useEffect } from "react";
import OnePicture from "./OnePicture";

const Pictures = ({
  pictures,
  onAdd,
  selectedCategory,
  searchText,
  onPictureClick,
  favorites,
  toggleFavorite,
}) => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPictures = (pictures || [])
    .filter((pic) =>
      selectedCategory === "all" ? true : pic.category_name === selectedCategory
    )
    .filter((pic) =>
      pic.title.toLowerCase().includes(searchText.toLowerCase())
    );

  const totalPages = Math.ceil(filteredPictures.length / itemsPerPage);

  const currentItems = filteredPictures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="text-center">
          <div className="row">
            {currentItems.length > 0 ? (
              currentItems.map((picture, index) => (
                <div key={index} className="col-lg-3 col-md-6 mb-4">
                  <OnePicture
                    picture={picture}
                    onAdd={onAdd}
                    onPictureClick={onPictureClick}
                    isFavorite={favorites.some((fav) => fav.id === picture.id)}
                    toggleFavorite={toggleFavorite}
                  />
                </div>
              ))
            ) : (
              <div className="col-12">
                <h4 className="text-muted">No pictures match your criteria.</h4>
              </div>
            )}
          </div>
        </div>

        {currentItems.length > 0 && (
          <nav
            aria-label="Page navigation example"
            className="d-flex justify-content-center mt-3"
          >
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
};

export default Pictures;
