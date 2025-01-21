import React from "react";
import OnePicture from "./OnePicture.jsx";
import { useState, useEffect } from "react";

const Pictures = ({ pictures, onAdd, selectedCategory }) => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPictures =
    selectedCategory === "all"
      ? pictures
      : pictures.filter((pic) => pic.category === selectedCategory);

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
            {currentItems.map((picture, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="card">
                  <div
                    className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src="https:/picsum.photos/200"
                      className="w-100"
                      alt={picture.title}
                    />
                    <a href="#!">
                      <div className="mask">
                        <div className="d-flex justify-content-start align-items-end h-100">
                          {picture.isNew && (
                            <h5>
                              <span className="badge bg-dark ms-2">NEW</span>
                            </h5>
                          )}
                        </div>
                      </div>
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
                    <p className="text-reset">
                      <h5 className="card-title mb-2">{picture.title}</h5>
                    </p>
                    <p className="text-reset">Category: {picture.category}</p>
                    <p className="text-reset">
                      <p>{picture.description}</p>
                    </p>
                    <h6 className="mb-3 price">{picture.price}$</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        onAdd(picture.title, picture.id, picture.amount)
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
        </div>
      </div>
    </section>
  );
};
export default Pictures;
