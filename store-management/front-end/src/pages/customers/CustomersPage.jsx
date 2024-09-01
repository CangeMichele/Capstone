// ---- React ----
import React, { useState } from "react";
// ----- Stilizzazione -----
import { Container, Form, Row, Col, Button } from "react-bootstrap";
// ----- Comopnenti -----
import {HandleNewCostumer} from "../../components/costumers/HandleNewCostumer.jsx";

const CustomersPage = () => {

  
  // Stato valori dai Form
  const [customerData, setCustomerData] = useState({
    name: "",
    surname: "",
    taxCode: "",
    cityPlace: "",
    birthPlaceCode: "",
    birthProvince: "",
    birthCountry: "Italia",
    sex: "M",
    birthDate: "",
    addressStreet: "",
    addressStreetNumber: "",
    addressCity: "",
    addressPostalCode: "",
    addressProvince: "",
    addressCountry: "",
    phone1: "",
    phone2: "",
    email: "",
    cardCode: "",
    registrationStore: "",
    registrationDate: "",
    prefferStoreForm: "",
    lastStore: "",
    fidelityStatus: "",
  });

  // Stato validazione Form  
  const [validated, setValidated] = useState(false);

  // Gestore cambiamento Input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  }; 

  // Gestore del submit del form
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Validazione del form
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
        // Riconoscimento pulsante Submit
        const submitButton = event.nativeEvent.submitter.name;
  
        if (submitButton === "new") {
          console.log('Salva dati:', customerData);
          // Logica per salvare i dati
        } 
        }
    setValidated(true);
  };


  return (
      <Container>
      <h1>Clienti</h1>

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="mt-5"
      >
        {/* ----- cerca/modifica/nuovo ----- ----- ----- ----- ----- ----- ----- ----- ----- -----*/}
        <Row className="mb-3">
          <Col xl="3" lg="4">
            <Form.Group controlId="customerNameForm">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nome"
                name="name"
                value={customerData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>

          <Col xl="3" lg="4">
            <Form.Group controlId="customerSurnameForm">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Cognome"
                name="surname"
                value={customerData.surname}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>

          <Col xl="2" lg="4">
            <Form.Group controlId="customerTaxCodeForm">
              <Form.Label>Codice Fiscale</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Codice Fiscale"
                name="taxCode"
                value={customerData.taxCode}
                onChange={handleInputChange}
                style={{ textTransform: 'uppercase' }}
              />
            </Form.Group>
          </Col>

          <Col xl="2" lg="4" className="d-flex align-items-end" >
            <Button
              type="submit"
              name="new"
              variant="primary"
              className="w-100"
            >
              Nuovo
            </Button>
          </Col>

          <Col xl="1" lg="4" className="d-flex align-items-end">
            <Button
              type="submit"
              name="edit"
              variant="primary"
              className="w-100"
            >
              Modifica
            </Button>
          </Col>

          <Col xl="1" lg="4" className="d-flex align-items-end">
            <Button
              type="submit"
              name="search"
              variant="primary"
              className="w-100"
            >
              Cerca
            </Button>
          </Col>
        </Row>

        <hr className="my-4" />

        {/* ----- Dati di nascita ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- */}
        <Row className="mb-3">
          <h5>Dati di Nascita</h5>
        </Row>
        <Row className="mb-3">
          <Col xl="4" lg="9">
            <Form.Group controlId="customerBirthCityForm">
              <Form.Label>Comune</Form.Label>
              <Form.Control
                type="text"
                name="cityPlace"
                placeholder="Comune"
                required
                value={customerData.cityPlace}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il Comune di nascita.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xl="1" lg="3">
            <Form.Group controlId="customerBirthPlaceCodeForm">
              <Form.Label>CAP</Form.Label>
              <Form.Control
                type="text"
                name="birthPlaceCode"
                placeholder="CAP"
                required
                value={customerData.birthPlaceCode}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il CAP.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xl="2" lg="6">
            <Form.Group controlId="customerBirthProvinceForm">
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                type="text"
                name="birthProvince"
                placeholder="Provincia"
                required
                value={customerData.birthProvince}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il Provincia di nascita.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xl="2" lg="6">
            <Form.Group controlId="customerBirthCountryForm">
              <Form.Label>Nazionalità</Form.Label>
              <Form.Control
                type="text"
                placeholder="nazionalità"
                name="birthCountry"
                required
                value={customerData.birthCountry}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci nazialità
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xl="1" lg="6">
            <Form.Group controlId="customerSexForm">
              <Form.Label>Sesso</Form.Label>
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  label="M"
                  value="M"
                  name="sex"
                  className="form-check-inline"
                  onChange={handleInputChange}
                  checked={customerData.sex === 'M'}
                />
                <Form.Check
                  type="radio"
                  label="F"
                  value="F"
                  name="sex"
                  className="form-check-inline"
                  onChange={handleInputChange}
                  checked={customerData.sex === 'F'}
                />
              </div>
            </Form.Group>
          </Col>

          <Col xl="2" lg="6">
            <Form.Group controlId="customerBirthDateForm">
              <Form.Label>Data di Nascita</Form.Label>
              <Form.Control
                type="date"
                placeholder="Data di Nascita"
                name="birthDate"
                required
                value={customerData.birthDate}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci una data di nascita valida.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <hr className="my-4" />

        {/* ----- Indirizzo ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- */}
        <h5>Indirizzo</h5>
        <Row className="mb-3">
          <Col xl="3" lg="9">
            <Form.Group controlId="customerAddressStreetForm">
              <Form.Label>Via/Piazza</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Via/Piazza"
                name="addressStreet"
                value={customerData.addressStreet}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci l'indirizzo.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xl="1" lg="3">
            <Form.Group controlId="customerAddressStreetNumberForm">
              <Form.Label>Civico</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="1"
                name="addressStreetNumber"
                value={customerData.addressStreetNumber}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci l'indirizzo.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xl="3" lg="9">
            <Form.Group controlId="customerAddressCityForm">
              <Form.Label>Città</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Città"
                name="addressCity"
                value={customerData.addressCity}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci la città.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xl="1" lg="3">
            <Form.Group controlId="customerAddressPostalCodeForm">
              <Form.Label>CAP</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="CAP"
                name="addressPostalCode"
                value={customerData.addressPostalCode}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il CAP.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xl="2" lg="6">
            <Form.Group controlId="customerAddressProvinceForm">
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Provincia"
                name="addressProvince"
                value={customerData.addressProvince}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci la provincia.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xl="2" lg="6">
            <Form.Group controlId="customerAddressCountryForm">
              <Form.Label>Paese</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Paese"
                name="addressCountry"
                value={customerData.addressCountry}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il paese.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <hr className="my-4" />

        {/* ----- Contatti ----- ----- ----- ----- ----- ----- ----- ----- ----- -----*/}
        <h5>Contatti</h5>
        <Row className="mb-3">
          <Col xl="4" lg="6">
            <Form.Group controlId="customerPhone1Form">
              <Form.Label>Telefono 1</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Telefono 1"
                name="phone1"
                value={customerData.phone1}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il primo numero di telefono.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xl="4" lg="6">
            <Form.Group controlId="customerPhone2Form">
              <Form.Label>Telefono 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefono 2"
                name="phone2"
                value={customerData.phone2}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col xl="4" lg="12">
            <Form.Group controlId="customerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                required
                value={customerData.email}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci un'email valida.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <hr className="my-4" />

        {/* ----- Dati negozio ----- ----- ----- ----- ----- ----- ----- ----- ----- -----*/}
        <h5>Dati negozio</h5>
        <Row className="mb-3">
          <Col xl="4" lg="6">
            <Form.Group controlId="customerCardCodeForm">
              <Form.Label>Numero carta fedeltà</Form.Label>
              <Form.Control
                type="text"
                placeholder="Numero carta fedeltà"
                required
                name="cardCode"
                value={customerData.cardCode}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il numero di carta fedeltà.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xl="4" lg="6">
            <Form.Group controlId="customerRegistrationStoreForm">
              <Form.Label>Punto Vendita di registrazione</Form.Label>
              <Form.Control
                type="text"
                placeholder="QUESTO"
                name="registrationStore"
                value={customerData.registrationStore}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il punto vendita abituale.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xl="4" lg="6">
            <Form.Group controlId="customerRegistrationDateForm">
              <Form.Label>Data registrazione</Form.Label>
              <Form.Control
                type="date"
                name="registrationDate"
                readOnly
                value={customerData.registrationDate || new Date().toISOString().split("T")[0]}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col xl="4" lg="6">
            <Form.Group controlId="customerPrefferStoreForm">
              <Form.Label>Punto vendita abituale</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="QUESTO"
                name="prefferStoreForm"
                value={customerData.prefferStoreForm}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il punto vendita abituale.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xl="4" lg="6"> 
            <Form.Group controlId="customerLastStoreForm">
              <Form.Label>Punto Vendita ultimo utilizzo</Form.Label>
              <Form.Control
                type="text"
                readOnly
                name="lastStore"
                placeholder="NUOVO"
                value={customerData.lastStore}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il punto vendita abituale.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xl="1" lg="6">
            <Form.Group controlId="customerFidelityStatusForm">
              <Form.Label>Carta attiva</Form.Label>
              <Form.Control
                type="text"
                placeholder="NUOVO"
                name="fidelityStatus"
                value={customerData.fidelityStatus}
                readOnly 
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CustomersPage;
