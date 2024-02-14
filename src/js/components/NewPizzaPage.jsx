import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPizzaData } from "../store";

export default function CreatePizzaPage() {
  const dispatch = useDispatch();
  const [navigateAway, setNavigateAway] = useState(false);
  const [modifiedPizzaData, setModifiedPizzaData] = useState({
    name: "",
    hostname: "",
    location: "",
    price: 0,
    minimum_nights: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://nodejs.sulla.hu/data/", modifiedPizzaData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let res = await axios.get("https://nodejs.sulla.hu/data");
      dispatch(setPizzaData(res.data));

      setNavigateAway(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;

    setModifiedPizzaData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  return (
    <div>
    {navigateAway ?  <Navigate to="/" replace={true} /> :
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formPizzaName">
        <Form.Label>Név</Form.Label>
        <Form.Control
          required
          type="text"
          name="name"
          placeholder="Név"
          value={modifiedPizzaData.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPizzaURL">
        <Form.Label>Hosztnév</Form.Label>
        <Form.Control
          required
          type="text"
          name="hostname"
          placeholder="https://example.com"
          value={modifiedPizzaData.hostname}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLocation">
        <Form.Label>Hely</Form.Label>
        <Form.Control
          required
          type="text"
          name="location"
          placeholder="Föld"
          value={modifiedPizzaData.location}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Ár</Form.Label>
        <Form.Control
          required
          type="number"
          name="price"
          placeholder="Föld"
          value={modifiedPizzaData.price}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formMinNights">
        <Form.Label>Minimum éjszakák száma</Form.Label>
        <Form.Control
          required
          type="text"
          name="minimum_nights"
          placeholder="5"
          value={modifiedPizzaData.minimum_nights}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="success" type="submit">
        Hozzáadás
      </Button>
    </Form>
  }
    </div>
  )
}