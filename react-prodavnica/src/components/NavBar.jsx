import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NavBar({
  cartNum,
  categories,
  onFilter,
  selectedCategory,
  onSearch,
  token,
  onLogout,
}) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = React.useState("");

  function handleLogout() {
    axios
      .post(
        "api/logout",
        {},
        {
          headers: {
            Authorization:
              "Bearer " + window.sessionStorage.getItem("auth_token"),
          },
        }
      )
      .then((response) => {
        console.log("Logout successful:", response.data);
      })
      .catch((error) => {
        console.log("Logout error:", error);
      })
      .finally(() => {
        onLogout(navigate);
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

            {token && (
              <>
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
                    to="/purchase-history"
                    className={`nav-link ${
                      location.pathname === "/purchase-history" ? "active" : ""
                    }`}
                  >
                    My Purchases
                  </Link>
                </li>
              </>
            )}

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
              <form
                className="d-flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSearch(searchInput);
                }}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className="btn btn-outline-light" type="submit">
                  🔍
                </button>
              </form>
            </div>
          )}

          {token == null ? (
            <a className=" nav-item nav-link" href="/login">
              Login
            </a>
          ) : (
            <a
              className=" nav-item nav-link text-danger"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              Logout
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
