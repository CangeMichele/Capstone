// ----- React-----
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// ----- api -----
import { loginUser } from "../../services/apiUser";
// ---- stilizzazione
import { Form, Row, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export default function UserLogin() {

  const [formData, setFormData] = useState({ userId: "", password: "" });
  const navigate = useNavigate(); 

  // Gestore cambiamento input form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestore invio form
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await loginUser(formData); //richiama api per il loging utente
      console.log("respone");
      console.log(response);
      
            
      localStorage.setItem("token", response.token); 

      // Trigger l'evento storage per aggiornare la Navbar
      window.dispatchEvent(new Event("storage")); // Scatena un evento di storage per aggiornare componenti come la Navbar
      
      alert("Login effettuato con successo!"); // Mostra un messaggio di successo
      navigate("/"); // Naviga alla Home

    } catch (error) {
      console.error("Errore durante il login:", error); 
      alert("Credenziali non valide. Riprova."); 
      console.log(formData);
      
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
    >
      <Form className=" p-4 text-center w-50"  onSubmit={handleSubmit}>
        <Row className="mb-3 justify-content-center">
          <Form.Group controlId="validationUserId">
            <Form.Label>Codice dipendente</Form.Label>
            <Form.Control required type="text" onChange={handleChange} name="userId" />
            <Form.Control.Feedback type="invalid">
              Codice non valido
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3 justify-content-center">
          <Form.Group controlId="validationPdVPassword">
          <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="password" onChange={handleChange} name="password" />
            <Form.Control.Feedback type="invalid">
              Password errata
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit" className="w-100">
          accedi
        </Button>
      </Form>
    </Container>
  );
}
