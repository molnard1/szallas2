import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ListPizzaPage() {
    const data = useSelector((state) => state.pizzaData);
    const items = data.map((item) => (
        <Col key={item.id} sm={4} style={{ marginTop: '10px', marginBottom: '20px' }}>
            <Card>
                <Card.Body style={{ textAlign: 'center' }}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                            Weboldal: <a href={item.hostname} target="_blank">{item.hostname}</a><br />
                            Hely: {item.location}<br />
                            Ár: {item.price}<br />
                            Minimum éjszakák: {item.minimum_nights}<br /><br />
                            <Link to={`/${item.id}`} style={{ cursor: 'pointer' }} className="btn btn-primary">Megtekintés</Link>
                    </Card.Text>
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