import React from 'react';
import { Form, Row, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./LoginPdV.css";

const LoginPdV = () => {
    return (
        <Container fluid className="d-flex justify-content-center align-items-center">
           
           <Form className=" p-4 text-center w-50">
                
                <Row className="mb-3 justify-content-center">
                    <Form.Group controlId="validationPdV">
                        <Form.Label>Punto Vendita</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="codice pv"
                        />
                        <Form.Control.Feedback type="invalid">PdV non valido</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3 justify-content-center">
                    <Form.Group controlId="validationPdVPassword">
                        <Form.Control
                            required
                            type="password"
                            placeholder="password"
                        />
                        <Form.Control.Feedback type="invalid">Password errata</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Button type="submit" className="w-100">accedi</Button>
            </Form>
        </Container>
    );
}

export default LoginPdV;
