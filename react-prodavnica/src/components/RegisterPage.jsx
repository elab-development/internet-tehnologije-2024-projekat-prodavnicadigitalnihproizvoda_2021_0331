import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    repeatedPassword: "",
  });

  let navigate = useNavigate();

  function handleInput(e) {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleRegister(e) {
    e.preventDefault();

    if (userData.password !== userData.repeatedPassword) {
      alert("Passwords do not match!");
      return;
    }

    const { name, email, password } = userData;

    axios
      .post("api/register", { name, email, password })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <section
      className="vh-100"
      style={{
        paddingTop: 4.5 + "rem",
      }}
    >
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="/img/registration.jpg"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleRegister}>
              <div className="form-outline mb-4">
                <input
                  type="name"
                  id="form3Example2"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid username"
                  name="name"
                  onInput={handleInput}
                />
                <label className="form-label" htmlFor="form3Example3">
                  Username
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  name="email"
                  onInput={handleInput}
                />
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  name="password"
                  onInput={handleInput}
                />
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example5"
                  className="form-control form-control-lg"
                  placeholder="Repeat your password"
                  name="repeatedPassword"
                  onInput={handleInput}
                />
                <label className="form-label" htmlFor="form3Example5">
                  Repeat Password
                </label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{
                    paddingLeft: 2.5 + "rem",
                    paddingRight: 2.5 + "rem",
                  }}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
