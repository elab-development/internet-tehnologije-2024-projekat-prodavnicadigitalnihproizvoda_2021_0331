import "./App.css";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";
import Pictures from "./components/Pictures";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Favorites from "./components/Favorites";
import Breadcrumbs from "./components/Breadcrumbs";
import useLocalStorage from "./hooks/useLocalStorage";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

function App() {
  const [token, setToken] = useState();
  const categories = ["Nature", "Portrait", "Abstract"];
  const [cartNum, setCartNum] = useState(0);
  const [cartPictures, setCartPictures] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedPicture, setSelectedPicture] = useState(null);

  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const toggleFavorite = (picture) => {
    setFavorites((prevFavorites) =>
      prevFavorites.find((fav) => fav.id === picture.id)
        ? prevFavorites.filter((fav) => fav.id !== picture.id)
        : [...prevFavorites, picture]
    );
  };

  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    axios
      .get("/api/pictures")
      .then((res) => {
        console.log("Slike učitane:", res.data);
        setPictures(res.data.pictures || []);
      })
      .catch((error) => {
        console.error("Greška pri dobijanju slika:", error);
      });
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const resetCategory = () => {
    setSelectedCategory("all");
  };

  const resetSearch = () => {
    setSearchText("");
    setSelectedCategory("all");
  };

  const closeModal = () => {
    setSelectedPicture(null);
  };

  function addPicture(id, title, price, low_res_path, high_res_path) {
    const existingPicture = cartPictures.find((pic) => pic.id === id);

    if (existingPicture) {
      alert("This picture is already in the cart.");
      return;
    }

    setCartPictures((prevCartPictures) => [
      ...prevCartPictures,
      { id, title, price, low_res_path, high_res_path, amount: 1 },
    ]);

    setCartNum((prevNum) => prevNum + 1);
  }

  function removePicture(id) {
    if (cartNum === 0) {
      return;
    }

    setCartNum(cartPictures.length - 1);

    setCartPictures((prevCartPictures) =>
      prevCartPictures.filter((pic) => pic.id !== id)
    );
  }

  function updateCartNum(num) {
    setCartNum(num);
    setCartPictures([]);
  }

  function addToken(auth_token) {
    setToken(auth_token);
  }

  return (
    <BrowserRouter className="App">
      <NavBar
        cartNum={cartNum}
        categories={categories}
        onFilter={handleFilter}
        selectedCategory={selectedCategory}
        onSearch={handleSearch}
        token={token}
      />

      <Breadcrumbs
        selectedCategory={selectedCategory}
        resetCategory={resetCategory}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage addToken={addToken} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/gallery"
          element={
            <Pictures
              pictures={pictures}
              onAdd={addPicture}
              selectedCategory={selectedCategory}
              searchText={searchText}
              onPictureClick={setSelectedPicture}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              pictures={cartPictures}
              remove={removePicture}
              updateCartNum={updateCartNum}
              resetCategory={resetCategory}
              resetSearch={resetSearch}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onAdd={addPicture}
              toggleFavorite={toggleFavorite}
            />
          }
        />
      </Routes>

      {selectedPicture && (
        <Modal picture={selectedPicture} onClose={closeModal} />
      )}

      <Footer />
    </BrowserRouter>
  );
}

export default App;
