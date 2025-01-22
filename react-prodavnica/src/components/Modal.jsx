import React from "react";

const Modal = ({ picture, onClose }) => {
  return (
    <div
      className="modal fade show"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="modal-dialog" style={{ maxWidth: "600px", width: "90%" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{picture.title}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            <img
              src="https:/picsum.photos/370"
              alt={picture.title}
              className="img-fluid"
              style={{
                maxWidth: "100%",
                maxHeight: "500px",
                objectFit: "cover",
              }}
            />
            <p className="mt-3">{picture.description}</p>
            <p className="fw-bold">Price: {picture.price} EUR</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
