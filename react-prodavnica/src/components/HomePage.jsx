import React from "react";
// import React, { useEffect, useState } from "react";

const HomePage = () => {
  // const [quote, setQuote] = useState("");

  // useEffect(() => {
  //   fetch("https://zenquotes.io/api/random")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data && data[0]) {
  //         setQuote(data[0]);
  //       }
  //     })
  //     .catch((error) =>
  //       console.error("Greška prilikom preuzimanja poruke:", error)
  //     );
  // }, []);

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
        {/* {quote && (
          <blockquote className="quote">
            <p>"{quote.q}"</p>
            <footer>- {quote.a}</footer>
          </blockquote>
        )} */}
        <br />

        <a href="/gallery" className="btn btn-dark btn-lg">
          Get Started
        </a>
      </div>
    </div>
  );
};

export default HomePage;
