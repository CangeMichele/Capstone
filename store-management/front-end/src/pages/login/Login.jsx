// ----- React -----
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// ----- API -----
import { loginUser, getUserData } from "../../services/apiUser";
import { getAllStores } from "../../services/apiStore";
// ---- Stilizzazione -----
import { Form, Row, Button, Container, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  //Stato contentente i Pdv
  const [stores, setStores] = useState([]);
  //Stato contenente il PdV elezionato
  const [selectedStore, setSelectedStore] = useState(null);
  // Stato valori user
  const [userData, setUserData] = useState({ userId: "", password: "" });

  // Stato mostra modale
  const [showModal, setShowModal] = useState(false);
  // Stato messaggio modale
  const [modalMessage, setModalMessage] = useState("");

  // Stato mostra modale benvenuto
  const [showWelcome, setShowWelcome] = useState(false);
  // Stato nome utente
  const [userName, setUserName] = useState("");

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
    const selectedStoreCode = e.target.value;
    const thisStore = stores.find(
      (store) => store.storeCode === selectedStoreCode
    );

    setSelectedStore(thisStore);
    // Salva il PdV selezionato nel localStorage
    localStorage.setItem("store", JSON.stringify(thisStore));
  };

  // Gestore cambiamento input form
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Gestore modifica testo modale
  const handleShowModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  //Callback status mostra modale
  const handleCloseModal = () => setShowModal(false);

  // Gestore invio form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await loginUser(userData); //richiama api per il loging utente
      localStorage.setItem("token", loginResponse.token);

      const userDataResponse = await getUserData();
      localStorage.setItem("user", JSON.stringify(userDataResponse));

      // controlla se utente giusto nel PdV giusto
      if (userDataResponse.storeCode !== selectedStore.storeCode) {
        handleShowModal(
          "L'utente non è associato al punto vendita selezionato. Seleziona il punto vendita corretto."
        );
        return;
      }

      // Imposta il nome utente e mostra il messaggio di benvenuto
      setUserName(userDataResponse.firstName);
      setShowWelcome(true);

      // Nascondi il messaggio di benvenuto e reindirizza dopo 2 secondi
      setTimeout(() => {
        setShowWelcome(false);
        navigate("/");
      }, 2000);


   
    } catch (error) {
      console.error("Errore durante il login:", error);
      handleShowModal("Credenziali non valide. Riprova.");
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center">
      <Form className=" p-4 text-center w-50" onSubmit={handleSubmit}>
        <Row className="mb-3 justify-content-center">
          <Form.Group controlId="store-select">
            <Form.Label>Punto Vendita</Form.Label>
            <Form.Select value={selectedStore?.storeCode || ""} onChange={handleStoreChange}>
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
          </Form.Group>
        </Row>

        <Button type="submit" className="w-100">
          accedi
        </Button>
      </Form>

      {/* Modal di benvenuto */}
      <Modal show={showWelcome} centered>
        <Modal.Body className="text-center">
          <h1 className="display-4">Benvenuto, {userName}!</h1>
        </Modal.Body>
      </Modal>

      {/* Modal per errori */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Messaggio</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}