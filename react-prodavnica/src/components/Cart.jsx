import React from "react";
import OnePicture from "./OnePicture";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
//const Cart = ({ pictures }) => {
//return (
// <div className="cart-container">
//     <h3>This is your cart</h3>
//     {pictures.map((pic) => (
//   <OnePicture picture = {pic} key={pic.id} inCart={0}/>
// ))}
// </div>

const Cart = ({ pictures, remove }) => {
  const [cartItems, setCartItems] = useState(pictures);
  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  const totalPrice = cartItems.reduce((total, pic) => total + pic.price, 0);
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100 py-5">
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

                    {/* Product 1 */}
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
                              <FaTimes />
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

                    {/* Summary */}
                    <hr
                      className="mb-4"
                      style={{
                        height: "2px",
                        backgroundColor: "#1266f1",
                        opacity: "1",
                      }}
                    />
                    <div className="d-flex justify-content-between p-2 mb-2 bg-primary">
                      <h5 className="fw-bold mb-0">Total:</h5>
                      <h5 className="fw-bold mb-0">{totalPrice}$</h5>
                    </div>
                  </div>

                  {/* Payment Section */}
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
                      >
                        Buy now
                      </button>
                      <h5
                        className="fw-bold mb-5"
                        style={{ position: "absolute", bottom: 0 }}
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
    </section>
  );
};
export default Cart;
