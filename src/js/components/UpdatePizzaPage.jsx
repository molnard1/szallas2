import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { editPizzaLocal } from "../store";

export default function UpdatePizzaPage() {
    const dispatch = useDispatch();
    const [pizzaData, setPizza] = useState({
        name: "",
        hostname: "",
        location: "",
        price: 0,
        minimum_nights: ""
    });
    const [navigateAway, setNavigateAway] = useState(false);
    const data = useSelector((state) => state.pizzaData);

    useEffect(() => {
        let item = data.find((item) => item.id == window.location.pathname.split("/")[1]);

        if (!item) {
            setNavigateAway(true);
        }

        setPizza(item);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`https://nodejs.sulla.hu/data/${pizzaData.id}`, pizzaData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            dispatch(editPizzaLocal(pizzaData));
            setNavigateAway(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;

        const updatedPizzaData = {
            ...pizzaData,
            [name]: newValue,
        };

        setPizza(updatedPizzaData);
    };

    return (
        <div>
            {navigateAway ? <Navigate to="/" replace={true} /> :
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formPizzaName">
                        <Form.Label>Név</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            placeholder="Név"
                            value={pizzaData.name}
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
                            value={pizzaData.hostname}
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
                            value={pizzaData.location}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Ár</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="price"
                            placeholder="Föld"
                            value={pizzaData.price}
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
                            value={pizzaData.minimum_nights}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="success" type="submit" style={{ marginRight: '10px' }}>
                        Szerkesztés
                    </Button>
                    <Button variant="secondary" onClick={() => setNavigateAway(true)}>
                        Mégse
                    </Button>
                </Form>
            }
        </div>
    );
}