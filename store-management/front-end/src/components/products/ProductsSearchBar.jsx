// ----- React -----
import React, { useEffect, useState } from "react";
// ----- Stilizzazione -----
import {
  Form,
  InputGroup,
  Button,
  Row,
  Col,
  Collapse,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductsSearchBar.css";
// ----- Funzioni -----
import { productsSearchHandler } from "./ProductsSearchHandler.js";

function ProductsSearchBar({
  thisBrand,
  srcParams,
  setSrcParams,
  handlerSearchResult,
  handlePagination,
  pagination,
  handleLoader,
}) {
  // Stato del testo di input
  const [search, setSearch] = useState("");

  // Stato per visualizzare il form di ricerca avanzata
  const [srcAdvanced, setSrcAdvanced] = useState(false);

  // Stato per radio selezionato
  const [selectedRadio, setSelectedRadio] = useState("");

  // Stato per check selezionati
  const [selectedCheck, setSelectedCheck] = useState({
    name: false,
    description: false,
  });

  // Stato per gestire errori
  const [errorCode, setErrorCode] = useState("");
  // Oggetto descrizione errori
  const errorList = {
    "01": "Campo di ricerca vuoto",
    "02": "Filtri di ricerca non selezionati",
    "03": "Valore non numerico",
    "04": "Lunghezza ean errata", // per ean
    "05": "Lunghezza codice errata", //per product_id
  };

  // Stato per gestire validazioneo module
  const [validated, setValidated] = useState(false);

  // Imposta di default radio su "brand" e check su "name" aggiornandosi al cambio di  brand
  useEffect(() => {
    if (thisBrand) {
      setSelectedRadio("brand");
      setSelectedCheck({ name: true, description: false });
    }
  }, [thisBrand]);

  useEffect(() => {
    // Reset errorCode
    setErrorCode("");
    setValidated(false);

    // Aggiorna srcParams con dati form e verifica validità
    switch (selectedRadio) {
      case "brand":
        if (!selectedCheck.name && !selectedCheck.description) {
          setErrorCode("02");
        } else {
          setSrcParams({
            filter_name: selectedRadio,
            filter_value: {
              brand: thisBrand.name,
              srcText: search,
              in_name: selectedCheck.name,
              in_description: selectedCheck.description,
            },
          });
        }
        break;

      case "global":
        if (search === "") {
          setErrorCode("01");
        } else if (!selectedCheck.name && !selectedCheck.description) {
          setErrorCode("02");
        } else {
          setSrcParams({
            filter_name: selectedRadio,
            filter_value: {
              srcText: search,
              in_name: selectedCheck.name,
              in_description: selectedCheck.description,
            },
          });
        }
        break;

      case "ean":
        if (search === "") {
          setErrorCode("01");
        } else if (!/^[0-9]+$/.test(search)) {
          setErrorCode("03");
        } else if (search.length !== 13) {
          setErrorCode("04");
        } else {
          setSrcParams({ filter_name: selectedRadio, filter_value: search });
        }
        break;

      case "product_id":
        if (search === "") {
          setErrorCode("01");
        } else if (!/^[0-9]+$/.test(search)) {
          setErrorCode("03");
        } else if (search.length !== 6) {
          setErrorCode("05");
        } else {
          setSrcParams({ filter_name: selectedRadio, filter_value: search });
        }
        break;
    }
  }, [search, selectedRadio, selectedCheck]);

  // Gestisce il cambiamento del valore radio button
  const handleButtonRadioChange = (key) => {
    setSelectedRadio(key);

    if (key === "ean" || key === "product_id") {
      setSelectedCheck((prevState) => ({
        ...prevState,
        name: false,
        description: false,
      }));
    } else {
      setSelectedCheck((prevState) => ({
        ...prevState,
        name:
          prevState.name === false && prevState.description === false
            ? true
            : prevState.name,
      }));
    }
  };

  // Gestisce il cambiamento del valore check button
  const handleButtonCheckChange = (key) => {
    setSelectedCheck((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  // Gestisce il submit del form che fa partire la ricerca
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // Controlla se ci sono errori nei parametri
    if (errorCode) {
      console.error(errorList[errorCode]);
    } else {
      setValidated(true); // Imposta lo stato di validazione come true

      // Chiamata alla funzione di ricerca
      await productsSearchHandler({
        thisBrand,
        srcParams,
        pagination,
        handleLoader,
        handlerSearchResult,
        handlePagination,
      });
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
      <InputGroup className="mb-3">
        {/* Mostra o nasconde i parametri di ricerca avanzata */}
        <Button
          variant="outline-secondary"
          onClick={() => setSrcAdvanced((prevState) => !prevState)}
          aria-controls="collapse-srcAdvanced"
          aria-expanded={srcAdvanced}
        >
          {srcAdvanced ? <span>&#9650;</span> : <span>&#9660;</span>}
        </Button>
        <Button type="submit" variant="outline-secondary">
          Cerca
        </Button>

        {/* Barra di ricerca */}
        <Form.Control
          type="search"
          placeholder="ricerca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          isInvalid={errorCode}
        />
        <Form.Control.Feedback type="invalid">
          {errorList[errorCode]}
        </Form.Control.Feedback>
      </InputGroup>

      {/* Form di ricerca avanzata */}
      <Collapse in={srcAdvanced}>
        <Container id="collapse-srcAdvanced">
          {thisBrand && (
            <Row>
              <Col>
                <p>Ricerca avanzata</p>
              </Col>
              <Col>
                <Form.Check // BRAND
                  type="radio"
                  id="filterBrand"
                  name="radioParams"
                  checked={selectedRadio === "brand"}
                  onChange={() => handleButtonRadioChange("brand")}
                  label={thisBrand.name}
                />
                <Form.Check // GLOBALE
                  type="radio"
                  id="filterGlobal"
                  name="radioParams"
                  checked={selectedRadio === "global"}
                  onChange={() => handleButtonRadioChange("global")}
                  label="Globale"
                />
              </Col>

              <Col>
                <Form.Check // NOME
                  type="checkbox"
                  id="filterName"
                  name="checkParams"
                  label="Nome prodotto"
                  checked={selectedCheck.name ? true : false}
                  onChange={() => handleButtonCheckChange("name")}
                  disabled={
                    selectedRadio === "ean" || selectedRadio === "product_id"
                      ? true
                      : false
                  }
                  isInvalid={errorCode === "02"}
                />
                <Form.Control.Feedback type="invalid">
                  Selezionare almeno un parametro
                </Form.Control.Feedback>

                <Form.Check // DESCRIZIONE
                  type="checkbox"
                  id="filterDescription"
                  name="checkParams"
                  label="Descrizione prodotto"
                  checked={selectedCheck.description ? true : false}
                  onChange={() => handleButtonCheckChange("description")}
                  disabled={
                    selectedRadio === "ean" || selectedRadio === "product_id"
                      ? true
                      : false
                  }
                  isInvalid={errorCode === "02"}
                />
                <Form.Control.Feedback type="invalid">
                  Selezionare almeno un parametro
                </Form.Control.Feedback>
              </Col>

              <Col>
                <Form.Check // EAN
                  type="radio"
                  id="filterEan"
                  name="radioParams"
                  checked={selectedRadio === "ean"}
                  onChange={() => handleButtonRadioChange("ean")}
                  label="EAN"
                  isInvalid={errorCode === "03" || errorCode === "04"}
                />
                <Form.Check // CODICE
                  type="radio"
                  id="filterProduct_id"
                  name="radioParams"
                  checked={selectedRadio === "product_id"}
                  onChange={() => handleButtonRadioChange("product_id")}
                  label="codice"
                />
              </Col>
            </Row>
          )}
        </Container>
      </Collapse>
    </Form>
  );
}

export default ProductsSearchBar;
