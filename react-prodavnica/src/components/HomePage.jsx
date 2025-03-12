import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const HomePage = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchRandomQuote();
      hasFetched.current = true;
    }
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/random-quote"
      );
      setQuote(response.data.quote);
      setAuthor(response.data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to load quote.");
      setAuthor("");
    }
  };

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
        <br />
        <br />

        <div className="quote-section">
          <p>"{quote}"</p>
          <p>
            <strong>- {author}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
