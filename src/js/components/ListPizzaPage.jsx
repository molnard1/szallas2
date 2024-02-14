import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ListPizzaPage() {
    const data = useSelector((state) => state.pizzaData);
    const loggedIn = useSelector((state) => state.loggedIn);
    const items = data.map((item) => (
        <Col key={item.id} sm={4} style={{ marginTop: '10px', marginBottom: '20px' }}>
            <Card>
                <Card.Body style={{ textAlign: 'center' }}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                            Weboldal: <a href={item.hostname} target="_blank">{item.hostname}</a><br />
                            Hely: {item.location}<br />
                            Ár: {item.price}<br />
                            Minimum északa: {item.minimum_nights}<br />
                    </Card.Text>
                    {loggedIn ? <>
                    <Link to={`/${item.id}/edit`}>
                        <Button variant="primary" style={{ marginRight: '10px' }}>
                            Szerkesztés
                        </Button>
                    </Link>
                    <Link to={`/${item.id}/delete`}>
                        <Button variant="danger">Törlés</Button>
                    </Link>
                    </>: null}
                </Card.Body>
            </Card>
        </Col>
    ));


    return (
            <Container>
                <Row>{[...items]}</Row>
            </Container>
    );
}