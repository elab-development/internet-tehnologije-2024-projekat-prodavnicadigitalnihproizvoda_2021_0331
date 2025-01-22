import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const Cart = ({
  pictures,
  remove,
  updateCartNum,
  resetCategory,
  resetSearch,
}) => {
  const [cartItems, setCartItems] = useState(pictures);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({});

  const navigate = useNavigate();

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((total, pic) => total + pic.price, 0);

  const handleBuyNow = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert(
        "Your cart is empty. Please add items before proceeding to purchase."
      );
      return;
    }

    const form = e.target.form;
    setPaymentData({
      cardNumber: form.typeText.value,
      cardName: form.typeName.value,
      expiration: form.typeExp.value,
      cvv: form.typeCvv.value,
    });
    setIsModalOpen(true);
  };

  const confirmPurchase = () => {
    alert("Purchase confirmed!");
    setIsModalOpen(false);
    setCartItems([]);
    updateCartNum(0);
    pictures.forEach((pic) => (pic.amount = 0));
    resetCategory();
    resetSearch();
    navigate("/gallery");
  };

  const cancelPurchase = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id="cart-section"
      className="h-100 d-flex flex-column justify-content-between"
      style={{ backgroundColor: "#eee", minHeight: "100vh" }}
    >
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div
              className="card shopping-cart"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 px-5 py-4">
                    <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                      Your pictures
                    </h3>

                    {cartItems.map((picture, index) => (
                      <div
                        className="d-flex align-items-center mb-5"
                        key={index}
                      >
                        <div className="flex-shrink-0">
                          <img
                            src="https:/picsum.photos/200"
                            className="img-fluid"
                            style={{ width: "150px" }}
                            alt={picture.name}
                          />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <a
                            href="#!"
                            className="float-end"
                            onClick={() => {
                              handleRemove(picture.id);
                              remove(picture.id);
                            }}
                          >
                            <i className="fas fa-times">
                              <FaTimes color="red" />
                            </i>
                          </a>
                          <h5 className="text-primary">{picture.title}</h5>
                          <div className="d-flex align-items-center">
                            <p className="fw-bold mb-0 me-5 pe-3">
                              {picture.price}$
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <hr
                      className="mb-4"
                      style={{
                        height: "2px",
                        backgroundColor: "black",
                        opacity: "1",
                      }}
                    />
                    <div
                      className="d-flex justify-content-between p-2 mb-2"
                      style={{ backgroundColor: "black" }}
                    >
                      <h5 className="fw-bold mb-0" style={{ color: "white" }}>
                        Total:
                      </h5>
                      <h5 className="fw-bold mb-0" style={{ color: "white" }}>
                        {totalPrice}$
                      </h5>
                    </div>
                  </div>

                  <div className="col-lg-6 px-5 py-4">
                    <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                      Payment
                    </h3>
                    <form className="mb-5">
                      <div className="form-outline mb-5">
                        <input
                          type="text"
                          id="typeText"
                          className="form-control form-control-lg"
                          size="17"
                          defaultValue="1234 5678 9012 3457"
                          minLength="19"
                          maxLength="19"
                        />
                        <label className="form-label" htmlFor="typeText">
                          Card Number
                        </label>
                      </div>
                      <div className="form-outline mb-5">
                        <input
                          type="text"
                          id="typeName"
                          className="form-control form-control-lg"
                          size="17"
                          defaultValue="John Smith"
                        />
                        <label className="form-label" htmlFor="typeName">
                          Name on card
                        </label>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-5">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="typeExp"
                              className="form-control form-control-lg"
                              defaultValue="01/22"
                              size="7"
                              minLength="7"
                              maxLength="7"
                            />
                            <label className="form-label" htmlFor="typeExp">
                              Expiration
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-5">
                          <div className="form-outline">
                            <input
                              type="password"
                              id="typeCvv"
                              className="form-control form-control-lg"
                              defaultValue="•••"
                              size="1"
                              minLength="3"
                              maxLength="3"
                            />
                            <label className="form-label" htmlFor="typeCvv">
                              CVV
                            </label>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-block btn-lg"
                        onClick={handleBuyNow}
                        style={{
                          backgroundColor: "black",
                          borderColor: "black",
                        }}
                      >
                        Buy now
                      </button>
                      <h5
                        className="fw-bold mb-5"
                        style={{
                          position: "absolute",
                          bottom: 0,
                        }}
                      >
                        <Link to="/gallery">
                          <i className="fas fa-angle-left me-2"></i>Back to
                          shopping
                        </Link>
                      </h5>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Data</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelPurchase}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Card Number: {paymentData.cardNumber}
                  <br />
                  Name on Card: {paymentData.cardName}
                  <br />
                  Expiration: {paymentData.expiration}
                  <br />
                  CVV: {paymentData.cvv}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirmPurchase}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelPurchase}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default Cart;
