// ----- React -----
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// ----- API -----
import { loginUser, getUserData } from "../../services/apiUser";
import { getAllStores } from "../../services/apiStore";
// ---- Stilizzazione -----
import { Form, Row, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  //Stato contentente i Pdv
  const [stores, setStores] = useState([]);
  //Stato contenente il PdV elezionato
  const [selectedStore, setSelectedStore] = useState("");
  // Stato valori user
  const [userData, setUserData] = useState({ userId: "", password: "" });

  const navigate = useNavigate();

  //Carico i PdV
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getAllStores(); // Effettua la chiamata API per ottenere i PdV
        setStores(response); // Aggiorna lo stato con i PdV
      } catch (error) {
        console.error("Errore durante il caricamento PdV:", error);
      }
    };
    fetchStores();
  }, []);

  // Gestore selezione PdV
  const handleStoreChange = (e) => {
    const selectedStoreCode  = (e.target.value);
    const thisStore = stores.find(store => store.storeCode === selectedStoreCode);

    setSelectedStore(thisStore);
    // Salva il PdV selezionato nel localStorage
    localStorage.setItem("store", JSON.stringify(thisStore));
  };

  // Gestore cambiamento input form
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Gestore invio form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginResponse  = await loginUser(userData); //richiama api per il loging utente
      localStorage.setItem("token", loginResponse.token);

      const userDataResponse = await getUserData();
      console.log("userDataResponse", userDataResponse);
      localStorage.setItem("user", JSON.stringify(userDataResponse));
      
    
      if (userDataResponse.storeCode !== selectedStore.storeCode) {
        alert("L'utente non è associato al punto vendita selezionato. Seleziona il punto vendita corretto.");
        return; // Blocca il login se gli storeCode non corrispondono
      }

      console.log("response", loginResponse);

      // Trigger l'evento storage per aggiornare la Navbar
      window.dispatchEvent(new Event("storage")); // Scatena un evento di storage per aggiornare componenti come la Navbar
      alert("Login effettuato con successo!"); // Mostra un messaggio di successo
      navigate("/"); // Naviga alla Home
    } catch (error) {
      console.error("Errore durante il login:", error);
      alert("Credenziali non valide. Riprova.");
      console.log(userData);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
    >
      <Form className=" p-4 text-center w-50" onSubmit={handleSubmit}>
        <Row className="mb-3 justify-content-center">
          <Form.Group controlId="store-select">
            <Form.Label>Punto Vendita</Form.Label>
            <Form.Select value={selectedStore} onChange={handleStoreChange}>
              <option key="label-option" value="">
                Seleziona un Punto Vendita
              </option>
              {stores.length > 0 ? (
                stores.map((store) => (
                  <option key={store.storeCode} value={store.storeCode}>
                    {store.Name} - {store.storeCode}
                  </option>
                ))
              ) : (
                <option disabled>Nessun Punto Vendita disponibile</option>
              )}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3 justify-content-center">
          <Form.Group controlId="validationUserId">
            <Form.Label>Codice dipendente</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={handleChange}
              name="userId"
            />
            <Form.Control.Feedback type="invalid">
              Codice non valido
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3 justify-content-center">
          <Form.Group controlId="validationPdVPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
            />
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
