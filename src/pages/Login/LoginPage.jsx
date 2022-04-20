import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Joi from "joi-browser";
import loginSchema from "../../validation/login.validation";
import { authActions } from "../../store/auth";
import jwt_decode from "jwt-decode";
import "./Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);

  const [emailError, setEmailErr] = useState([]);
  const [passwordError, setPasswordErr] = useState([]);

  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
    console.log("ref");
  }, [emailRef]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const navigateToBizOrUser = (isBiz, isRegister = false) => {
    if (isBiz) {
      if (isRegister) {
        history.push("/businesscard");
      } else {
        history.push("/cardspanel");
      }
    } else {
      history.push("/home");
    }
  };

  const handleOnSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    const validatedValue = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });
    const { error } = validatedValue;
    if (error) {
      let newEmailErr = [];
      let newPasswordErr = [];
      error.details.forEach((item) => {
        const errMsg = item.message;
        const errSrc = item.path[0];
        if (errSrc === "email") {
          newEmailErr = [...newEmailErr, errMsg];
        }
        if (errSrc === "password") {
          newPasswordErr = [...newPasswordErr, errMsg];
        }
      });
      setEmailErr(newEmailErr);
      setPasswordErr(newPasswordErr);
      console.log("err", error);
    } else {
      axios
        .post("/users/login", {
          email,
          password,
        })
        .then((res) => {
          dispatch(authActions.login());
          localStorage.setItem("tokenKey", res.data.token);
          const decoded = jwt_decode(res.data.token);
          dispatch(authActions.updateUser(decoded));
          if (location.state === null) {
            navigateToBizOrUser(decoded.biz);
          } else {
            if (location.state.fromPage) {
              history.push(location.state.fromPage);
            } else {
              navigateToBizOrUser(decoded.biz, location.state.register);
            }
          }
        })
        .catch((err) => {
          if (err.response) {
            alert(err.response.data);
          }
          localStorage.clear();
          dispatch(authActions.logout());
        });
    }
  };
  const memoizedCallback = useCallback(() => {
    if (location.state) {
      if (location.state.email && location.state.password) {
        if (!email || !password) {
          setEmail(location.state.email);
          setPassword(location.state.password);
        } else {
          handleOnSubmit();
        }
      }
    }
  }, [location.state, handleOnSubmit]);

  useEffect(() => {
    memoizedCallback();
  }, [location.state, email, password, memoizedCallback]);

  return (
    <div className="container">
      <div className="spice"></div>
      <form className="form" onSubmit={handleOnSubmit}>
        <h1>Login Page</h1>
        <div className="spice"></div>
        <label className="text" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          ref={emailRef}
        ></input>
        {emailError.map((item) => {
          return <div className="msg-error">{item}</div>;
        })}

        <div className="spice"></div>
        <label className="text" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        {passwordError.map((item) => {
          return <div className="msg-error">{item}</div>;
        })}

        <div className="spice"></div>
        <button className="btn btn-primary">login</button>
      </form>
    </div>
  );
};

export default LoginPage;
