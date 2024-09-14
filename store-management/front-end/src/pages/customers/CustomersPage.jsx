// ---- React ----
import React, { useEffect, useState } from "react";
// ----- React-router-dom ----- 
import { useNavigate } from "react-router-dom";
// ----- Stilizzazione -----
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

import "./CustomersPage.css";
//----- Funzioni -----
import { formatterData } from "../../functions/formatterData.js";
// ----- Lodash -----
import _ from "lodash";
// ----- Comopnenti -----
import CustomerToast from "../../components/customers/CustumerToast.jsx";
import NewCustomer from "../../components/customers/NewCustomer.jsx";
import CustomerSearch from "../../components/customers/CustomerSearch.jsx";
import UpdateCustomer from "../../components/customers/UpdateCustomer.jsx";

const CustomersPage = () => {
  // ----- INIZIALIZZAZIONE PARAMETRI -----
  // Form vuoto
  const newForm = {
    firstName: "",
    lastName: "",
    taxCode: "",
    birthDate: "",
    placeOfBirth: {
      city: "",
      province: "",
      country: "",
    },
    sex: "",
    contacts: [
      {
        phone1: "",
        phone2: "",
        email: "",
        address: [
          {
            street: "",
            streetNumber: "",
            city: "",
            province: "",
            postalCode: "",
            country: "",
          },
        ],
      },
    ],

    cardCode: "",
    registrationStore: "",
    preferredStore: "",
    registrationDate: formatterData(new Date(), "yyyy-MM-dd"),
    isActive: null,
  };

  // Stato form aggiornato
  const [formData, setFormData] = useState(newForm);

  // Stato della validazione di tutto il  form
  const [validatedAll, setValidatedAll] = useState(null);

  //Stato che della validazione dei campi del form necessari per ricerca
  const [validatedSearch, setValidateSearch] = useState({});

  //Stato che contiene array di risultati
  const [srcResult, setSrcResult] = useState([]);
  //Stato che mostra o nasconde select con risultati ricerca
  const [selectView, setSelectView] = useState(false);
  //Stato che contiene customer selezionato dall'option
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Stato classe layout form
  const [layout, setLayout] = useState("");

  // Stato loader
  const [isLoading, setIsLoading] = useState(false);

  // Stato che abilitia il taost
  const [showCustomerToast, setShowCustomerToast] = useState(false);
  // Stato delle informazioni per il toast
  const [toastMessage, setToastMessage] = useState({
    header: "",
    body: "",
  });


  const CustomerFormReset = () => {
    // Reset degli stati
    setFormData(newForm);
    setLayout("");
    setValidatedAll(null);
    setValidateSearch({
      firstName: null,
      lastName: null,
      taxCode: null,
    });
    setSrcResult([]);
    setSelectView(false);
    setToastMessage /
      {
        header: "",
        body: "",
      };
  };

  // ----- Gestore cambiamento input dal form -----
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // aggiorna formData con lodash (usa name per navigare l'oggetto ed asseganre value)
    setFormData((prevFormData) => {
      const newFormData = _.set({ ...prevFormData }, name, value);
      return newFormData;
    });

    // Stilizzazione per input modificato
    if (layout === "search") {
      event.target.classList.add("update");
    }
  };

  // ----- Gestore della selezione nel select dei risultati di ricerca -----
  const handleSelectedCustomer = (event) => {
    // option cliccato
    const thisCustomer = event.target.value;

    // cerca il cliente selezionato fra i risultati
    let customer = srcResult.find((cust) => cust._id === thisCustomer);

    // prende valore del customer selezionato
    if (customer) {
      customer = {
        ...customer,
        birthDate: formatterData(customer.birthDate, "yyyy-MM-dd"),
        registrationDate: formatterData(
          customer.registrationDate,
          "yyyy-MM-dd"
        ),
      };
      setSelectedCustomer(customer);
    }

    setLayout("search");
  };
  // ogni volta che viene selezioanto un customer aggiorna formData che popola il form
  useEffect(() => {
    if (selectedCustomer) {
      // Crea una copia di selectedCustomer
      const updatedFormData = _.cloneDeep(selectedCustomer);
      setFormData(updatedFormData);
    }
  }, [selectedCustomer]);

  // ----- GESTORE DEI SUBMIT DEL FORM -----
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const submitOn = event.nativeEvent.submitter.name;

    //reset dei valori di validità
    setValidatedAll(null);
    setValidateSearch({
      firstName: null,
      lastName: null,
      taxCode: null,
    });
    setSelectedCustomer(null);

    // ----- Nuovo cliente -----
    if (submitOn === "new") {
      //se form non valido, stop e segnala sul form validità negativa
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
      setValidatedAll(true);
      // altrimenti aggiungi cliente
      NewCustomer(
        setIsLoading,
        { ...formData },
        setToastMessage,
        CustomerFormReset,
        setShowCustomerToast
      );

      // ----- Ricerca cliente -----
    } else if (submitOn === "search") {
      // Controlla errori:
      //se assente codice fiscale
      if (!formData.taxCode) {
        // se assente anche nome o cognome o entrambi, errore e stoppa
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
      // ricerca cliente
      CustomerSearch(
        setSrcResult,
        setSelectView,
        { ...formData },
        setValidateSearch,
        setIsLoading,
        setToastMessage,
        setShowCustomerToast
      );

      // ----- Modifica cliente -----
    } else if (submitOn === "edit") {
      //se form non valido, stop e segnala sul form validità negativa
      if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidatedAll(false);
      }

      //aggiorna cliente
      UpdateCustomer(
        { ...selectedCustomer },
        { ...formData },
        setToastMessage,
        setShowCustomerToast,
        setIsLoading,
        CustomerFormReset
      );
    }
  };

  return (
    <>
      <CustomerToast
        showCustomerToast={showCustomerToast}
        setShowCustomerToast={setShowCustomerToast}
        toastMessage={toastMessage}
      />
      <Container>
       
        <Row className="align-items-center mb-3">
          <Col xs="auto">
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              className="mb-3"
            >
              <FaArrowLeft /> Indietro
            </Button>
          </Col>
          <Col>
            <h1 className="text-center">Clienti</h1>
          </Col>
        </Row>

        <Form
          noValidate
          validated={validatedAll}
          onSubmit={handleSubmit}
          className="mt-5"
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

            <Col xl="3" lg="3">
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

            <Col xl="2" lg="2" className="d-flex align-items-end">
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
                onClick={() => {
                  CustomerFormReset();
                }}
              >
                Reset
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              {selectView ? (
                <Form.Select
                  aria-label="Risultati ricerca"
                  onChange={handleSelectedCustomer}
                >
                  <option key="label-option" value="">
                    Risultati ricerca
                  </option>
                  {srcResult.length > 0 ? (
                    <>
                      {srcResult.map((customer) => (
                        <option key={customer._id} value={customer._id}>
                          {customer.firstName} {customer.lastName} -{" "}
                          {customer.taxCode.toUpperCase()}
                        </option>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </Form.Select>
              ) : (
                <Form.Control
                  type="text"
                  placeholder={isLoading ? "Ricerca in corso..." : ""}
                  readOnly
                ></Form.Control>
              )}
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
                  name="placeOfBirth.city"
                  placeholder="Comune"
                  required
                  value={formData.placeOfBirth.city || ""}
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
                  name="placeOfBirth.province"
                  placeholder="Provincia"
                  required
                  value={formData.placeOfBirth.province || ""}
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
                  name="placeOfBirth.country"
                  required
                  value={formData.placeOfBirth.country || ""}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Inserisci nazialità
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xl="2" lg="6">
              <Form.Group controlId="customerSexForm">
                <Form.Label>Sesso</Form.Label>
                <div
                  className={`d-flex justify-content-around  ${layout} customer-box`}
                >
                  <Form.Check
                    type="radio"
                    label="M"
                    value="M"
                    name="sex"
                    onChange={handleInputChange}
                    checked={formData.sex === "M"}
                  />
                  <Form.Check
                    type="radio"
                    label="F"
                    value="F"
                    name="sex"
                    className={`form-check-inline`}
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
                  name="contacts[0].address[0].street"
                  value={formData.contacts[0]?.address[0]?.street || ""}
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
                  placeholder=""
                  name="contacts[0].address[0].streetNumber"
                  value={formData.contacts[0]?.address[0]?.streetNumber || ""}
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
                  name="contacts[0].address[0].city"
                  value={formData.contacts[0]?.address[0]?.city || ""}
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
                  name="contacts[0].address[0].postalCode"
                  value={formData.contacts[0]?.address[0]?.postalCode || ""}
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
                  name="contacts[0].address[0].province"
                  value={formData.contacts[0]?.address[0]?.province || ""}
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
                  name="contacts[0].address[0].country"
                  value={formData.contacts[0]?.address[0]?.country || ""}
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
                  name="contacts[0].phone1"
                  value={formData.contacts[0]?.phone1 || ""}
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
                  name="contacts[0].phone2"
                  value={formData.contacts[0]?.phone2 || ""}
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
                  name="contacts[0].email"
                  required
                  value={formData.contacts[0]?.email || ""}
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
                  value={formData.cardCode || ""}
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

            <Col xl="4" lg="6">
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
            <Col lg="8"></Col>

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

            <Col xl="2" lg="4" className="d-flex align-items-end">
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
    </>
  );
};

export default CustomersPage;
