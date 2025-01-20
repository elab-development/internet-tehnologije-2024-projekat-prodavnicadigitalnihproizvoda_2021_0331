import "./App.css";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";
import Pictures from "./components/Pictures";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [cartNum, setCartNum] = useState(0);
  const [cartPictures, setCartPictures] = useState([]);

  const [pictures, setPictures] = useState([
    {
      id: 1,
      title: "Picture 1",
      description: "Description 1",
      price: 2500,
      amount: 0,
    },
    {
      id: 2,
      title: "Picture 2",
      description: "Description 2",
      price: 1200,
      amount: 0,
    },
    {
      id: 3,
      title: "Picture 3",
      description: "Description 3",
      price: 1000,
      amount: 0,
    },
    {
      id: 4,
      title: "Picture 4",
      description: "Description 4",
      price: 1250,
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
      <NavBar cartNum={cartNum}></NavBar>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/gallery"
          element={<Pictures pictures={pictures} onAdd={addPicture} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              pictures={cartPictures}
              remove={removePicture}
              updateCartNum={updateCartNum}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
