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
import { useState } from "react";
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

  // const [pictures, setPictures] = useState([
  //   axios.get("api/pictures").then((res) => {
  //     console.log(res.data);
  //   }),
  //   // {
  //   //   id: 1,
  //   //   title: "Picture 1",
  //   //   description: "Description 1",
  //   //   category: "Nature",
  //   //   price: 2500,
  //   //   amount: 0,
  //   // },
  //   // {
  //   //   id: 2,
  //   //   title: "LALALALAL",
  //   //   description: "Description 2",
  //   //   category: "Nature",
  //   //   price: 1200,
  //   //   amount: 0,
  //   // },
  //   // {
  //   //   id: 3,
  //   //   title: "Picture 3",
  //   //   description: "Description 3",
  //   //   category: "Nature",
  //   //   price: 1000,
  //   //   amount: 0,
  //   // },
  //   // {
  //   //   id: 4,
  //   //   title: "Picture 31",
  //   //   description: "Description 4",
  //   //   category: "Nature",
  //   //   price: 1250,
  //   //   amount: 0,
  //   // },
  //   // {
  //   //   id: 5,
  //   //   title: "Picture 5",
  //   //   description: "Description 5",
  //   //   category: "Nature",
  //   //   price: 3000,
  //   //   amount: 0,
  //   // },
  //   // {
  //   //   id: 6,
  //   //   title: "Picture 6",
  //   //   description: "Description 6",
  //   //   category: "Abstract",
  //   //   price: 1200,
  //   //   amount: 0,
  //   // },
  // ]);

  function addPicture(id, title, price) {
    const existingPicture = cartPictures.find((pic) => pic.id === id);

    if (existingPicture) {
      alert("This picture is already in the cart.");
      return;
    }

    // setPictures((prevPictures) =>
    //   prevPictures.map((pic) =>
    //     pic.id === id ? { ...pic, amount: pic.amount + 1 } : pic
    //   )
    // );

    setCartPictures((prevCartPictures) => [
      ...prevCartPictures,
      { id, title, price, amount: 1 },
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
