import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { isLogUser } from "../../function/isLogUser";
import { getUserData } from "../../services/api.js";
const Home = () => {
  // ---- funzione che controlla se utente loggato, se no rimanda al login
  isLogUser();

  // ----- recupero dati utente loggato
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error("Errore nel recupero dei dati utente:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <>
      <Row className="d-flex align-items-center">
        <Col xs="auto">
          <h1>Benvenuto</h1>
        </Col>
        <Col xs="auto">
          <h3> {user.firstName}</h3>
        </Col>
      </Row>

      <Form className=" p-4 text-center w-50">
        <Button variant="primary" size="lg" onClick={() => navigate('/casher') }>
          Cassa
        </Button>
        <Button variant="primary" size="lg" onClick={() => navigate('/products') }>
          Articoli
        </Button>
        <Button variant="primary" size="lg" onClick={() => navigate('/costumers') }>
          Clienti
        </Button>
      </Form>
    </>
  );
};

export default Home;
