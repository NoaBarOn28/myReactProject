import { useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import RegisterSchema from "../validation/registration.validation";
import { useHistory } from "react-router-dom";
import { Fragment } from "react";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biz, setBiz] = useState(false);
  const [nameError, setNameErr] = useState([]);
  const [emailError, setEmailErr] = useState([]);
  const [passwordError, setPasswordErr] = useState([]);

  const history = useHistory();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleBizChange = (event) => {
    setBiz(event.target.checked);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const validatedSignup = Joi.validate(
      { name, email, password, biz },
      RegisterSchema,
      {
        abortEarly: false,
      }
    );
    const { error } = validatedSignup;
    if (error) {
      let newNameErr = [];
      let newEmailErr = [];
      let newPasswordErr = [];
      error.details.forEach((item) => {
        const errMsg = item.message;
        const errSrc = item.path[0];
        if (errSrc === "name") {
          newNameErr = [...newNameErr, errMsg];
        }
        if (errSrc === "email") {
          newEmailErr = [...newEmailErr, errMsg];
        }
        if (errSrc === "password") {
          newPasswordErr = [...newPasswordErr, errMsg];
        }
      });
      setNameErr(newNameErr);
      setEmailErr(newEmailErr);
      setPasswordErr(newPasswordErr);
    } else {
      axios
        .post("/users/register", {
          name,
          email,
          password,
          biz,
        })
        .then((res) => {
          console.log("check", res.data);
          history.push("/login", { email, password, register: true });
        })
        .catch((err) => {
          if (err.response) {
            alert(err.response.data);
          }
        });
    }
  };
  return (
    <Fragment>
      <form onSubmit={handleOnSubmit}>
        <h2>Registration Page</h2>
        <div className="spice"></div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your Name"
          value={name}
          onChange={handleNameChange}
        ></input>
        {nameError.map((item) => {
          return <div className="msg-error">{item}</div>;
        })}

        <div className="spice"></div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your Email"
          value={email}
          onChange={handleEmailChange}
        ></input>
        {emailError.map((item) => {
          return <div className="msg-error">{item}</div>;
        })}

        <div className="spice"></div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your Password"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        {passwordError.map((item) => {
          return <div className="msg-error">{item}</div>;
        })}

        <div className="spice"></div>
        <label htmlFor="password">Biz Number:</label>
        <input
          type="checkbox"
          id="biz"
          placeholder="Are you biz account?"
          checked={biz}
          onChange={handleBizChange}
        ></input>
        <div className="spice"></div>
        <button>Registration</button>
      </form>
    </Fragment>
  );
};

export default RegistrationPage;
