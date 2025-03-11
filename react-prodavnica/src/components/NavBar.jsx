import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function NavBar({
  cartNum,
  categories,
  onFilter,
  selectedCategory,
  onSearch,
  token,
}) {
  function handleLogout() {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "api/logout",
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.sessionStorage.setItem("auth_token", null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const location = useLocation();
  const handleCategoryChange = (e) => {
    onFilter(e.target.value);
  };
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };
  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
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
                to="/favorites"
                className={`nav-link ${
                  location.pathname === "/favorites" ? "active" : ""
                }`}
              >
                Favorites
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
            <div className="d-flex gap-3">
              <select
                className="form-select w-auto"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="" disabled>
                  Filter by Category
                </option>
                <option value="all">All</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => handleSearchChange(e)}
                />
              </form>
            </div>
          )}

          {token == null ? (
            <a className=" nav-item nav-link" href="/login">
              Login
            </a>
          ) : (
            <a className=" nav-item nav-link" href="/" onClick={handleLogout}>
              Logout
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
