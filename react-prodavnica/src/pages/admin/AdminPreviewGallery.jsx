import React, { useState, useEffect } from "react";
import axios from "axios";
import OnePicture from "../../components/OnePicture";

const AdminPreviewGallery = () => {
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    axios.get("/api/pictures").then((res) => {
      setPictures(res.data.pictures || []);
    });
  }, []);

  const totalPages = Math.ceil(pictures.length / itemsPerPage);

  const currentItems = pictures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section style={{ backgroundColor: "#f9f9f9" }}>
      <div className="container py-5">
        <h2 className="text-center mb-4">Gallery Preview</h2>
        <div className="row">
          {currentItems.map((picture, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <OnePicture
                picture={picture}
                onAdd={() => {}}
                onPictureClick={() => {}}
                isFavorite={false}
                toggleFavorite={() => {}}
                readonly={true}
              />
            </div>
          ))}
        </div>

        {pictures.length > itemsPerPage && (
          <nav className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &laquo;
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
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
};

export default AdminPreviewGallery;
