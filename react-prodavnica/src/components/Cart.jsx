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
  console.log("Podaci u Cart komponenti:", pictures);
  const [cartItems, setCartItems] = useState(pictures);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({});

  const navigate = useNavigate();

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems
    .reduce((total, pic) => total + parseFloat(pic.price), 0)
    .toFixed(2);

  const handleBuyNow = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert(
        "Your cart is empty. Please add items before proceeding to purchase."
      );
      return;
    }

    const form = e.target.form;

    const cardNumber = form.typeText.value.trim();
    const cardName = form.typeName.value.trim();
    const expiration = form.typeExp.value.trim();
    const cvv = form.typeCvv.value.trim();

    if (!cardNumber || !cardName || !expiration || !cvv) {
      alert("Please fill in all payment fields.");
      return;
    }

    if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ""))) {
      alert("Invalid card number. Please enter 16 digits.");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert("Invalid CVV. Please enter 3 digits.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiration)) {
      alert("Invalid expiration date. Use format MM/YY.");
      return;
    }
    const [expMonth, expYear] = expiration.split("/").map(Number);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear() % 100;

    if (
      expYear < currentYear ||
      (expYear === currentYear && expMonth < currentMonth)
    ) {
      alert("Card is expired. Please use a valid card.");
      return;
    }

    setPaymentData({
      cardNumber,
      cardName,
      expiration,
      cvv,
    });

    setIsModalOpen(true);
  };

  const confirmPurchase = async () => {
    const token = sessionStorage.getItem("auth_token");

    if (!token) {
      alert("You must be logged in to confirm purchase.");
      setIsModalOpen(false);
      return;
    }

    alert("Purchase confirmed!");
    setIsModalOpen(false);

    try {
      for (const pic of cartItems) {
        const responseCart = await fetch("http://127.0.0.1:8000/api/cart", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ picture_id: pic.id }),
        });

        const result = await responseCart.json();
        const cartId = result.cart?.id;

        if (!cartId) {
          console.error("Cart ID not found for picture:", pic.title);
          continue;
        }

        const downloadUrl = `http://127.0.0.1:8000/api/cart/${cartId}/download`;
        const responseDownload = await fetch(downloadUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!responseDownload.ok) {
          console.error("Download failed for", pic.title);
          continue;
        }

        const blob = await responseDownload.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${pic.title}.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }

      setCartItems([]);
      updateCartNum(0);
      pictures.forEach((pic) => (pic.amount = 0));
      resetCategory();
      resetSearch();
      navigate("/gallery");
    } catch (error) {
      console.error("Purchase process failed:", error);
    }
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
                          {console.log(
                            "Putanja slike u korpi:",
                            picture.low_res_path
                          )}
                          <img
                            src={
                              picture.low_res_path?.startsWith("http")
                                ? picture.low_res_path
                                : `http://localhost:8000/${picture.low_res_path}`
                            }
                            className="img-fluid"
                            style={{
                              width: "90px",
                              height: "90px",
                              objectFit: "cover",
                            }}
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
                              {picture.price} EUR
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
                        {totalPrice} EUR
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
                          placeholder="1234 5678 9012 3457"
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
                          placeholder="John Smith"
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
                              placeholder="01/22"
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
                              placeholder="•••"
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
