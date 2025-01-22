import React from "react";

const HomePage = () => {
  return (
    <div id="main">
      <div className="getstarted">
        <h1>WELCOME TO OUR DIGITAL ART STORE!</h1>
        <p>
          Digital art store, your one - stop shop for unique and inspiring
          digital art! Explore a curated collection of high-quality,
          downloadable artwork. Whether you're looking for stunning wallpapers,
          printable art, or assets to bring your projects to life, we've got you
          covered. Start your journey into the world of digital creativity today
          - your next masterpiece is just a click away!
        </p>
        <br />
        <a href="/gallery" className="btn btn-dark btn-lg">
          Get Started
        </a>
      </div>
    </div>
  );
};

export default HomePage;
