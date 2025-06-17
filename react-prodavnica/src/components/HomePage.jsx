import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const HomePage = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const hasFetched = useRef(false);
  const [artworkTitle, setArtworkTitle] = useState("");
  const [artworkArtist, setArtworkArtist] = useState("");

  useEffect(() => {
    if (!hasFetched.current) {
      fetchRandomQuote();
      fetchArtOfTheDay();

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

  const fetchArtOfTheDay = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/art-of-the-day"
      );
      console.log("ART:", response.data);
      setArtworkTitle(response.data.title);
      setArtworkArtist(response.data.artist);
    } catch (error) {
      console.error("Greška pri dohvatanju umetničkog dela:", error);
      setArtworkTitle("Unknown artwork");
      setArtworkArtist("Unknown artist");
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
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: "14px",
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "10px 16px",
          borderRadius: "8px",
          textAlign: "center",
          zIndex: 999,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
          Art of the day:
        </div>
        <div>
          <strong>{artworkTitle}</strong>
          {" – "}
          <em>{artworkArtist}</em>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
