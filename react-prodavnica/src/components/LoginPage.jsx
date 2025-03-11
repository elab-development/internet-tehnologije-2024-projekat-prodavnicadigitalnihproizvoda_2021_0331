import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ addToken }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();
  function handleInput(e) {
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  }

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("api/login", userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          window.sessionStorage.setItem("auth_token", res.data.access_token);
          addToken(res.data.access_token);
          navigate("/gallery");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form onSubmit={handleLogin} style={{ width: "23rem" }}>
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Log in
                </h3>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example18"
                    className="form-control form-control-lg"
                    name="email"
                    onInput={handleInput}
                  />
                  <label className="form-label" htmlFor="form2Example18">
                    Email address
                  </label>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example28"
                    className="form-control form-control-lg"
                    name="password"
                    onInput={(e) => handleInput(e)}
                  />
                  <label className="form-label" htmlFor="form2Example28">
                    Password
                  </label>
                </div>

                <div className="pt-1 mb-4">
                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-info btn-lg btn-block"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <p>
                  Don't have an account?{" "}
                  <a href="/register" className="link-info">
                    Register here
                  </a>
                </p>
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src="/img/login.jpg"
              alt="Login"
              className="w-60 vh-57"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
