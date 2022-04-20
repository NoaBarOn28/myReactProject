import { useState } from "react";
import { useHistory } from "react-router-dom";
import businessCardSchema from "../validation/businessCard.validation";
import axios from "axios";
import Joi from "joi-browser";

const BusinessCard = () => {
  const [name, SetBizName] = useState("");
  const [description, SetDescription] = useState("");
  const [address, SetAddress] = useState("");
  const [phone, SetPhone] = useState("");
  const [image, setImage] = useState("");

  const history = useHistory();
  const handleNameChange = (event) => {
    SetBizName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    SetDescription(event.target.value);
  };
  const handleAddressChange = (event) => {
    SetAddress(event.target.value);
  };
  const handlePhoneChange = (event) => {
    SetPhone(event.target.value);
  };

  const handleImage = (event) => {
    setImage(event.target.value);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const validatedCreateCard = Joi.validate(
      { name, description, address, phone, image },
      businessCardSchema,
      {
        abortEarly: false,
      }
    );
    const { error } = validatedCreateCard;
    if (error) {
      console.log(error);
    } else {
      axios
        .post("/cards/create", { name, description, phone, address, image })
        .then((res) => {
          console.log(res.data);
          history.push("/cardspanel");
        })
        .catch((err) => {
          if (err.response) {
            alert(err.response.data);
          }
        });
    }
  };

  return (
    <div className="container">
      <h1>Create Business Card</h1>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="name">Business Name: </label>
        <input
          type="string"
          id="name"
          placeholder="Enter your Business Name"
          value={name}
          onChange={handleNameChange}
          required
        ></input>
        <div className="spice"></div>
        <label htmlFor="description">Business Description: </label>
        <input
          type="string"
          id="description"
          placeholder="Enter Description"
          value={description}
          onChange={handleDescriptionChange}
          required
        ></input>
        <div className="spice"></div>
        <label htmlFor="address">Business Address: </label>
        <input
          type="string"
          id="address"
          placeholder="Enter your Address"
          value={address}
          onChange={handleAddressChange}
          required
        ></input>
        <div className="spice"></div>
        <label htmlFor="phone">Business Phone: </label>
        <input
          type="number"
          id="phone"
          placeholder="Enter your Phone/Business Number"
          value={phone}
          onChange={handlePhoneChange}
          required
        ></input>
        <div className="spice"></div>
        <label htmlFor="image">Business Image: </label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={handleImage}
          placeholder="Enter Image Link"
        />

        <div className="spice"></div>
        <button>Create Card</button>
      </form>
    </div>
  );
};

export default BusinessCard;
