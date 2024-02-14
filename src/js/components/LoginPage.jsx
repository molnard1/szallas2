import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { setLoggedIn } from "../store";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
    const dispatch = useDispatch();
    const [navigateAway, setNavigateAway] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const username = e.target.username.value;
        const password = e.target.password.value;

        if(username === "admin" && password === "admin") {
            dispatch(setLoggedIn(true));
            setNavigateAway(true);
        }
    }

    return (
        <div>
            {navigateAway ?  <Navigate to="/" replace={true} /> : <>
                <h1>Bejelentkezés</h1>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Felhasználónév</label>
                        <input type="text" className="form-control" id="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Jelszó</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <Button variant="success" type="submit">
                        Bejelentkezés
                    </Button>
                </Form>
            </>}
        </div>
    )
}