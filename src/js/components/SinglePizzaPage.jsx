import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

export default function SinglePizzaPage() {
    const data = useSelector((state) => state.pizzaData);
    const loggedIn = useSelector((state) => state.loggedIn);
    const [item, setItem] = useState({
        name: "",
        hostname: "",
        location: "",
        price: 0,
        minimum_nights: ""
    });
    const [navigateAway, setNavigateAway] = useState(false);

    useEffect(() => {
        let item = data.find((item) => item.id == window.location.pathname.split("/")[1]);

        if (!item) {
            setNavigateAway(true);
        }

        setItem(item);
    }, []);

    return (
        <div>
            {navigateAway ? <Navigate to="/" replace={true} /> : <div className="text-center mt-5">
                <h1>{item.name}</h1>
                Weboldal: <a href={item.hostname} target="_blank">{item.hostname}</a><br />
                Hely: {item.location}<br />
                Ár: {item.price}<br />
                Minimum éjszakák: {item.minimum_nights}<br />
                {loggedIn ? <>
                    <Link to={`/${item.id}/edit`}>
                        <Button variant="primary" style={{ marginRight: '10px' }}>
                            Szerkesztés
                        </Button>
                    </Link>
                    <Link to={`/${item.id}/delete`}>
                        <Button variant="danger">Törlés</Button>
                    </Link>
                </> : null}
            </div>}
        </div>
    )
}