import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = ({ selectedCategory, resetCategory }) => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav
      aria-label="breadcrumb"
      style={{ backgroundColor: "#f8f9fa", padding: "10px" }}
    >
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          if (
            value === "gallery" &&
            isLast &&
            selectedCategory &&
            selectedCategory !== "all"
          ) {
            return (
              <React.Fragment key={index}>
                <li className="breadcrumb-item">
                  <span
                    style={{ cursor: "pointer", color: "#007bff" }}
                    onClick={resetCategory}
                  >
                    Gallery
                  </span>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)}
                </li>
              </React.Fragment>
            );
          }

          return isLast ? (
            <li
              key={index}
              className="breadcrumb-item active"
              aria-current="page"
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </li>
          ) : (
            <li key={index} className="breadcrumb-item">
              <Link to={routeTo}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
