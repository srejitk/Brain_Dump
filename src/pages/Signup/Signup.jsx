import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";

export default function Signup() {
  const defaultData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [userData, setUserData] = useState(defaultData);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { value, name } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (userData) => {
    try {
      const response = await axios.post("/api/auth/signup", userData);
      if (response.status === 201) {
        setUserData(defaultData);
        navigate("/login");
        console.log("HOAGAYA");
        localStorage.setItem("Token", response.data.encodedToken);
      }
    } catch (error) {
      setError("Something went wrong");
      console.log(error);
    }
  };
  const pwdVisibiltyHandler = () => {
    setShowPassword(() => !showPassword);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleSignup(userData);
  };
  return (
    <main
      className={`${styles.auth_content} content flex-row-wrap flex-mid-center`}
    >
      <div
        className={`${styles.glass__form} flex-mid-center flex-column-wrap flex-gap20`}
      >
        <h4 className="header-5">Sign Up</h4>
        <p className="body-1">Join us and get access to exclusive items</p>
        <form
          className={`${styles.glass__form__wrapper}  flex-mid-center br-8 flex-column-wrap`}
          onSubmit={submitHandler}
        >
          <div className="input__container">
            <input
              type="name"
              placeholder="Full Name"
              name="firstName"
              onChange={handleInput}
              value={userData.name}
              className={`input__field ${styles.glass__input}`}
              required
            />
          </div>
          <div className="input__container">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={handleInput}
              className={`input__field ${styles.glass__input}`}
              required
            />
          </div>
          <div className="input__container position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              id="pwd1"
              value={userData.password}
              className={`input__field ${styles.glass__input} `}
              onChange={handleInput}
              required
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

          <div className="input__container position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              id="pwd2"
              value={userData.confirmPassword}
              className={`input__field ${styles.glass__input} `}
              onChange={handleInput}
              required
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
          {error && <div className={styles.error_msg}>{error}</div>}
          <p className="text--terms caption text--center">
            By signing up you agree to accept all terms and conditions and agree
            to abide by the platform rules
          </p>
          <button
            type="submit"
            className="btn btn--primary btn--large glass__btn glass__btn-1"
          >
            Sign up
          </button>
          <p className="subtitle-2">Already a Member?</p>
          <Link to="/login" className="btn btn--large glass__btn glass__btn-2">
            Log In
          </Link>
        </form>
      </div>

      <div
        className={`${styles.glass__form__image} flex-mid-center position-relative`}
      >
        <img
          src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1648996657/House%20Of%20Glass/image-removebg-preview_3_cdpjqp.png"
          alt="banner-sign-up"
        />
      </div>
    </main>
  );
}
