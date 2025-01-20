import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function NavBar({ cartNum }) {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-xl navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Digital art store
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarBasic"
          aria-controls="navbarBasic"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse show" id="navbarBasic">
          <ul className="navbar-nav me-auto mb-2 mb-xl-0">
            <li className="nav-item">
              <Link
                to="/gallery"
                className={`nav-link ${
                  location.pathname === "/gallery" ? "active" : ""
                }`}
              >
                Gallery
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/cart"
                className={`nav-link ${
                  location.pathname === "/cart" ? "active" : ""
                }`}
              >
                <FaShoppingCart />
              </Link>
            </li>
            <li className="nav-item">
              <p className="cart-num">{cartNum}</p>
            </li>
          </ul>
          {location.pathname === "/gallery" && (
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          )}
          <a className=" nav-item nav-link" href="/login">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
