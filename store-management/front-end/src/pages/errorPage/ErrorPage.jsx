import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Container, Col } from "react-bootstrap";

function ErrorPage() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Panina inesistente</h1>
            <h3>erroe 404</h3>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ErrorPage;
