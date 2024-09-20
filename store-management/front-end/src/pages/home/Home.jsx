// ----- React -----
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ----- stilizzazione -----
import { Row, Col, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCashRegister, FaBox, FaUser, FaStore  } from "react-icons/fa";
import "./Home.css"
// ----- funzioni & api per login -----
import { isLogUser } from "../../functions/isLogUser";

const Home = () => {
  // ---- funzione che controlla se utente loggato, se no rimanda al login
  isLogUser();

  // ----- recupero dati utente loggato
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const store = JSON.parse(localStorage.getItem("store"));

  return (
    <>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs="auto">
          <h1 className="me-2">Benvenuto</h1>
        </Col>
        <Col xs="auto">
          <h3>
            {user.firstName} {user.lastName}
          </h3>
        </Col>
      </Row>

      <Row>
        <Col xl="8">
          <Form className="p-4 text-center">
            
            <Row className="mb-3">
              
              <Col className="d-flex justify-content-end ">
                <Button
                  variant="primary"
                  size="lg"
                  className="d-none d-lg-block d-flex flex-column align-items-center justify-content-center w-50 "
                  style={{ aspectRatio: "1 / 1" }}
                  onClick={() => navigate("/casher")}
                >
                  <FaCashRegister size="2rem" /> {/* Icona grande */}
                  <span className="mt-2">Cassa</span> {/* Nome del bottone */}
                </Button>
              </Col>

              <Col className="d-flex justify-content-start">
                <Button
                  variant="primary"
                  size="lg"
                  className="d-flex flex-column align-items-center justify-content-center w-50"
                  style={{ aspectRatio: "1 / 1" }}
                  onClick={() => navigate("/products")}
                >
                  <FaBox size="2rem" /> {/* Icona grande */}
                  <span className="mt-2">Articoli</span>{" "}
                  {/* Nome del bottone */}
                </Button>
              </Col>

            </Row>

            <Row>

              <Col className="d-flex justify-content-end">
                <Button
                  variant="primary"
                  size="lg"
                  className="d-flex flex-column align-items-center justify-content-center w-50"
                  style={{ aspectRatio: "1 / 1" }}
                  onClick={() => navigate("/customers")}
                >
                  <FaUser size="2rem" /> {/* Icona grande */}
                  <span className="mt-2">Clienti</span> {/* Nome del bottone */}
                </Button>
              </Col>

              <Col className="d-flex justify-content-start">
                <Button
                  variant="primary"
                  size="lg"
                  className="d-flex flex-column align-items-center justify-content-center w-50"
                  style={{ aspectRatio: "1 / 1" }}
                  onClick={() => navigate("/brands")}
                >
                  <FaStore size="2rem" /> {/* Icona grande per i fornitori */}
                  <span className="mt-2">Fornitori</span>{" "}
                  {/* Nome del bottone */}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>

        <Col>
          <h2>{store.codeStore}</h2>
          <h3>{store.Name}</h3>
          <h4>Orari di apertura:</h4>
          <ul>
            {store.openingHours.map((hours, index) => (
              <li key={index}>
                <strong>{hours.day}:</strong> {hours.open} - {hours.close}
              </li>
            ))}
          </ul>
          <h4>Contatti:</h4>
          <p>Telefono: {store.contacts[0].phone1}</p>
          <p>Numero diretto: {store.contacts[0].phone2}</p>
          <p>Email: {store.contacts[0].email}</p>
        </Col>
      </Row>
    </>
  );
};

export default Home;
