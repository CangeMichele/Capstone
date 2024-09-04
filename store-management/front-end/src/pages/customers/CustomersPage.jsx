// ---- React ----
import React, { useState } from "react";
// ----- Stilizzazione -----
import { Container, Form, Row, Col, Button, Collapse } from "react-bootstrap";
import "./CustomersPage.css";
// ----- Comopnenti -----
import {
  handleNewCustomer,
  handleEditCustomer,
  handleSearchCustomer,
} from "../../components/customers/HandleApiCustomer.jsx";

const CustomersPage = () => {
  // Stato valori dai Form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    taxCode: "",
    birthDate: "",
    birthCity: "",
    birthProvince: "",
    birthCountry: "Italia",
    sex: "M",
    phone1: "",
    phone2: "",
    email: "",
    addressStreet: "",
    addressStreetNumber: "",
    addressCity: "",
    addressProvince: "",
    addressPostalCode: "",
    addressCountry: "",
    cardCode: "",
    registrationStore: "",
    registrationDate: new Date().toISOString().split("T")[0],
    preferredStore: "",
    isActive: "",
  });

  // Stato che gestisce validazione form
  const [validatedAll, setValidatedAll] = useState(null);

  //Stato che gestisce validazione campi ricerca
  const [validatedSearch, setValidateSearch] = useState({
    firstName: null,
    lastName: null,
    taxCode: null,
  });

  //Stato che contiene array di risultati
  const [srcResult, setSrcResult] = useState([]);

  // Stato classe layout form
  const [layout, setLayout] = useState("");

  //Stato che mostra o nasconde select con risultati ricerca
  const [resultSelect, setResultSelect] = useState(false);

  // Gestore cambiamento valori Input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      //se data nascita, formatta in aaaa/mm/gg
      [name]:
        name === "birthDate"
          ? new Date(value).toISOString().split("T")[0]
          : value,
    });
    //Agginge classe layout al campo modificato
    if (layout === "search") {
      event.target.classList.add("update");
    }
  };

  //Gestore reset form
  const handleResetForm = () => {
    const resetParams = {};

    for (const key in formData) {
      if (key === "birthCountry") {
        resetParams[key] = "Italia";
      } else if (key === "sex") {
        resetParams[key] = "M";
      } else if (key === "registrationDate") {
        resetParams[key] = new Date().toISOString().split("T")[0];
      } else {
        resetParams[key] = "";
      }
    }

    setFormData(resetParams);
    setLayout("");
    setValidatedAll(null);
    setValidateSearch({
      firstName: null,
      lastName: null,
      taxCode: null,
    });
    setSrcResult([]);
    setResultSelect(false);
  };

  // Gestisce il cambio del select e popola form con dati cliente
  const handleSelectedCustomer = (event) => {
    setLayout("search");
    const thisCustomer = event.target.value;
    console.log("thisCustomer: ");

    if (thisCustomer) {
      // Trova il cliente selezionato e popola il modulo
      const selectedCustomer = srcResult.find(
        (customer) => customer.taxCode === thisCustomer
      );
      if (selectedCustomer) {
        setFormData(selectedCustomer);
      }
    }
  };

  // Gestore dei  submit del form
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const submitButton = event.nativeEvent.submitter.name;
    console.log("submit", submitButton);

    //reset dei valori di validità
    setValidatedAll(null);
    setValidateSearch({
      firstName: null,
      lastName: null,
      taxCode: null,
    });

    // Se submit su Nuovo o Modifica
    if (submitButton === "new" || submitButton === "edit") {
      //Controlla NON validità del form
      if (form.checkValidity() === false) {
        event.stopPropagation();
        //imposta valore validità su false
        setValidatedAll(false);
      }
      // se form ok, gestisce nuovo o modifica
      else {
        if (submitButton === "new") {
          handleNewCustomer(formData);
          handleResetForm;
        } else if (submitButton === "edit") {
          handleEditCustomer(formData);
          handleResetForm;
        }
      }
      // validazione positiva
      setValidatedAll(true);

      //Se submit su ricerca
    } else if (submitButton === "search") {
      //reset validazione sul form
      setValidatedAll(null);

      //reset risultati ricerca
      setSrcResult([]);

      // Controlla errori:
      //se assente codice fiscale
      if (!formData.taxCode) {
        // se assente anche nome o cognome o entrambi, errore
        if (!formData.firstName || !formData.lastName) {
          event.stopPropagation();
          setValidateSearch({
            firstName: !!formData.firstName,
            lastName: !!formData.lastName,
            taxCode: false,
          });
          return;
        }
      }

      // Setta i campi come validi o null
      setValidateSearch({
        firstName: formData.firstName ? true : null,
        lastName: formData.lastName ? true : null,
        taxCode: formData.taxCode ? true : null,
      });

      // Popola parametri di riceca
      const srcParams = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        taxCode: formData.taxCode,
      };
      handleSearchCustomer(srcParams, setSrcResult);

      //apri select con i risultati
      setResultSelect(true);

      console.log("srcResult", srcResult);
    }
  };

  return (
    <Container>
      <h1>Clienti</h1>

      <Form
        noValidate
        onSubmit={handleSubmit}
        className="mt-5"
        validated={validatedAll}
      >
        {/* ----- Nome, Cognome, CodFisc, Cerca ----- ----- ----- ----- ----- ----- ----- ----- ----- -----*/}
        <Row className="mb-3">
          <Col xl="3" lg="3">
            <Form.Group controlId="customerNameForm">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                className={layout}
                required
                type="text"
                placeholder="Nome"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleInputChange}
                isValid={validatedSearch.firstName === true}
                isInvalid={validatedSearch.firstName === false}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il nome
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xl="3" lg="3">
            <Form.Group controlId="customerSurnameForm">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                className={layout}
                required
                type="text"
                placeholder="Cognome"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleInputChange}
                isValid={validatedSearch.lastName === true}
                isInvalid={validatedSearch.lastName === false}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il cognome
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xl="2" lg="3">
            <Form.Group controlId="customerTaxCodeForm">
              <Form.Label>Codice Fiscale</Form.Label>
              <Form.Control
                className={layout}
                required
                type="text"
                placeholder="Codice Fiscale"
                name="taxCode"
                value={formData.taxCode || ""}
                onChange={handleInputChange}
                style={{ textTransform: "uppercase" }}
                isValid={validatedSearch.taxCode === true}
                isInvalid={validatedSearch.taxCode === false}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il codice fiscale
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xl="1" lg="2" className="d-flex align-items-end">
            <Button
              type="submit"
              name="search"
              variant="primary"
              className="w-100"
            >
              Cerca
            </Button>
          </Col>

          <Col xl="1" lg="1" className="d-flex align-items-end">
            <Button
              name="search"
              variant="outline-primary"
              className="w-100"
              onClick={handleResetForm}
            >
              Res
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Collapse in={resultSelect}>
              <Container id="collapse-resultSelect">
                <Form.Select
                  aria-label="Risultati ricerca"
                  onChange={handleSelectedCustomer}
                >
                  <option key="label-option" value="">
                    Clienti trovati
                  </option>
                  {srcResult.length > 0 ? (
                    srcResult.map((customer) => (
                      <option key={customer.taxCode} value={customer.taxCode}>
                        {customer.firstName} {customer.lastName} -{" "}
                        {customer.taxCode}
                      </option>
                    ))
                  ) : (
                    <option key="notResult">NESSUN VALORE TROVATO</option>
                  )}
                </Form.Select>
              </Container>
            </Collapse>
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
                className={layout}
                type="text"
                name="birthCity"
                placeholder="Comune"
                required
                value={formData.birthCity || ""}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il Comune di nascita.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xl="2" lg="6">
            <Form.Group controlId="customerBirthProvinceForm">
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                className={layout}
                type="text"
                name="birthProvince"
                placeholder="Provincia"
                required
                value={formData.birthProvince || ""}
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
                className={layout}
                type="text"
                placeholder="nazionalità"
                name="birthCountry"
                required
                value={formData.birthCountry || ""}
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
                  className={`form-check-inline ${layout}`}
                  onChange={handleInputChange}
                  checked={formData.sex === "M"}
                />
                <Form.Check
                  type="radio"
                  label="F"
                  value="F"
                  name="sex"
                  className={`form-check-inline ${layout}`}
                  onChange={handleInputChange}
                  checked={formData.sex === "F"}
                />
              </div>
            </Form.Group>
          </Col>

          <Col xl="2" lg="6">
            <Form.Group controlId="customerBirthDateForm">
              <Form.Label>Data di Nascita</Form.Label>
              <Form.Control
                className={layout}
                type="date"
                placeholder="Data di Nascita"
                name="birthDate"
                required
                value={formData.birthDate || ""}
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
                className={layout}
                required
                type="text"
                placeholder="Via/Piazza"
                name="addressStreet"
                value={formData.addressStreet || ""}
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
                className={layout}
                required
                type="text"
                placeholder="1"
                name="addressStreetNumber"
                value={formData.addressStreetNumber || ""}
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
                className={layout}
                required
                type="text"
                placeholder="Città"
                name="addressCity"
                value={formData.addressCity || ""}
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
                className={layout}
                required
                type="text"
                placeholder="CAP"
                name="addressPostalCode"
                value={formData.addressPostalCode || ""}
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
                className={layout}
                required
                type="text"
                placeholder="Provincia"
                name="addressProvince"
                value={formData.addressProvince || ""}
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
                className={layout}
                required
                type="text"
                placeholder="Paese"
                name="addressCountry"
                value={formData.addressCountry || ""}
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
                className={layout}
                required
                type="text"
                placeholder="Telefono 1"
                name="phone1"
                value={formData.phone1 || ""}
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
                className={layout}
                type="text"
                placeholder="Telefono 2"
                name="phone2"
                value={formData.phone2 || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>

          <Col xl="4" lg="12">
            <Form.Group controlId="customerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className={layout}
                type="email"
                placeholder="Email"
                name="email"
                required
                value={formData.email || ""}
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
                className={layout}
                type="text"
                placeholder="Numero carta fedeltà"
                required
                name="cardCode"
                value={formData.cardCode}
                onChange={handleInputChange || ""}
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
                className={layout}
                type="text"
                placeholder="QUESTO"
                name="registrationStore"
                value={formData.registrationStore || ""}
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
                className={layout}
                type="date"
                name="registrationDate"
                readOnly
                value={formData.registrationDate || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>

          <Col xl="4" lg="6">
            <Form.Group controlId="customerPrefferStoreForm">
              <Form.Label>Punto vendita abituale</Form.Label>
              <Form.Control
                className={layout}
                required
                type="text"
                placeholder="QUESTO"
                name="preferredStore"
                value={formData.preferredStore || ""}
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
                className={layout}
                type="text"
                name="lastStore"
                placeholder="NUOVO"
                value={formData.lastStore || ""}
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
                className={layout}
                type="text"
                placeholder="NUOVO"
                name="fidelityStatus"
                value={formData.isActive || ""}
                readOnly
                style={{
                  color: formData.isActive ? "green" : "red",
                  fontWeight: "bold",
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <hr className="my-4" />

        {/* ----- Nuovo, Cerca ----- ----- ----- ----- ----- ----- ----- ----- ----- -----*/}
        <Row className="mb-4">
          <Col log="8"></Col>

          <Col xl="2" lg="4" className="d-flex align-items-end">
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
        </Row>
      </Form>
    </Container>
  );
};

export default CustomersPage;
