import "./App.css";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";
import Pictures from "./components/Pictures";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [cartNum, setCartNum] = useState(0);
  const [cartPictures, setCartPictures] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = ["Nature", "Portrait", "Abstract"];

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  const resetCategory = () => {
    setSelectedCategory("all");
  };

  const [pictures, setPictures] = useState([
    {
      id: 1,
      title: "Picture 1",
      description: "Description 1",
      category: "Nature",
      price: 2500,
      amount: 0,
    },
    {
      id: 2,
      title: "Picture 2",
      description: "Description 2",
      category: "Nature",
      price: 1200,
      amount: 0,
    },
    {
      id: 3,
      title: "Picture 3",
      description: "Description 3",
      category: "Nature",
      price: 1000,
      amount: 0,
    },
    {
      id: 4,
      title: "Picture 4",
      description: "Description 4",
      category: "Nature",
      price: 1250,
      amount: 0,
    },

    {
      id: 5,
      title: "Picture 5",
      description: "Description 5",
      category: "Nature",
      price: 3000,
      amount: 0,
    },

    {
      id: 6,
      title: "Picture 6",
      description: "Description 6",
      category: "Abstract",
      price: 1200,
      amount: 0,
    },
  ]);

  function refreshCart() {
    let newPictures = pictures.filter((pic) => pic.amount > 0);
    setCartPictures(newPictures);
  }

  function addPicture(title, id, amount) {
    if (amount === 1) {
      return;
    } else {
      setCartNum(cartNum + 1);
    }

    pictures.forEach((pic) => {
      if (pic.id === id) {
        pic.amount++;
      }
    });

    refreshCart();
  }

  function removePicture(id) {
    if (cartNum === 0) {
      return;
    }

    setCartNum(cartNum - 1);
    setCartPictures(cartPictures.filter((pic) => pic.id !== id));

    setPictures(
      pictures.map((pic) => {
        if (pic.id === id) {
          pic.amount = 0;
        }
        return pic;
      })
    );
  }

  function updateCartNum(num) {
    setCartNum(num);
    setCartPictures([]);
  }

  return (
    <BrowserRouter className="App">
      <NavBar
        cartNum={cartNum}
        categories={categories}
        onFilter={handleFilter}
        selectedCategory={selectedCategory}
      ></NavBar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/gallery"
          element={
            <Pictures
              pictures={pictures}
              onAdd={addPicture}
              selectedCategory={selectedCategory}
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
            />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
