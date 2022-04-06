import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";
import { useAuth } from "../../contexts/Auth/AuthContext";
import { Toast } from "../../components";

export default function Login() {
  const defaultData = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(defaultData);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLogged, setIsLogged, userDetails, setUserDetails } = useAuth();
  const guest = {
    email: "adarshbalika@gmail.com",
    password: "adarshBalika",
  };
  const handleInput = (e) => {
    const { value, name } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async (loginData) => {
    try {
      const response = await axios.post("/api/auth/login", loginData);
      if (response.status === 200) {
        setIsLogged(true);
        setUserDetails(response.data.foundUser);
        localStorage.setItem("Token", response.data.encodedToken);
        setLoginData(defaultData);
        navigate("/");
        <Toast type={"success"} message={"Welcome back 007!"} />;
      }
    } catch (error) {
      setError("No user exists!");
      console.log(error);
      <Toast type={"error"} message={"You're not a part of our cult yet!"} />;
    }
  };

  const pwdVisibiltyHandler = () => {
    setShowPassword(() => !showPassword);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(loginData);
  };
  const handleGuest = () => {
    handleLogin(guest);
  };
  return (
    <main className={`${styles.auth_content} content grid col2x2`}>
      <div
        className={`${styles.glass__form} flex-mid-center br-8 flex-column-wrap`}
      >
        <h4 className="header-5">Sign In</h4>
        <p className="body-1 text--center">
          Join back and get access to exclusive items
        </p>

        <form
          className={`${styles.glass__form__wrapper} position-relative flex-mid-center br-8 flex-column-wrap`}
          onSubmit={submitHandler}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            value={loginData.email}
            className={`input__field ${styles.glass__input} `}
            onChange={handleInput}
          />
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              id="pwd"
              value={loginData.password}
              className={`input__field ${styles.glass__input} `}
              onChange={handleInput}
            />
            {showPassword ? (
              <button
                onClick={pwdVisibiltyHandler}
                className={`btn_action position-absolute ${styles.passwordIcon} btn--small flex-mid-center transparent-btn`}
              >
                <span className="material-icons">visibility_off</span>
              </button>
            ) : (
              <button
                onClick={pwdVisibiltyHandler}
                className={`btn_action position-absolute ${styles.passwordIcon} btn--small flex-mid-center transparent-btn`}
              >
                <span className="material-icons">visibility</span>
              </button>
            )}
          </div>

          <div className={styles.glass__input__options}>
            <div className={`input__container ${styles.glass__form__input}`}>
              <label htmlFor="remember-me" className="input--sidelabel">
                Remember Me
              </label>
              <input
                type="checkbox"
                id="remember-me"
                className=" input--field--checkbox input--demo"
              />
            </div>
            <button
              onClick={() => handleGuest()}
              className={`${styles.glass__input__guest} btn subtitle-1`}
            >
              Login as guest
            </button>
          </div>
          <p className={`${styles.text__terms} caption text--center`}>
            By signing in you agree to accept all terms and conditions and agree
            to abide by the platform rules
          </p>
          <button
            type="submit"
            className={`btn btn--primary btn--large ${styles.glass__btn} ${styles.glass__btn_1}`}
          >
            Log In
          </button>
          <p className="subtitle-2">Not a Member?</p>
          <Link
            to="/sign-up"
            className={`btn btn--large ${styles.glass__btn} ${styles.glass__btn_2}`}
          >
            Sign Up
          </Link>
        </form>
      </div>
      <div className={`${styles.glass__form__image} flex-mid-center`}>
        <img
          src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1648996657/House%20Of%20Glass/image-removebg-preview_3_cdpjqp.png"
          alt="login-hero-illustration"
        />
      </div>
    </main>
  );
}
