// ----- react
import React, { useEffect, useState } from "react";
// ----- stilizzazione
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import "./ProductsSearchBar.css";

function ProductsSearchBar({
  thisBrand,
  setSrcParams,
  handleSubmitState,
  isSubmit,
  setIsSubmit
}) {
  // Stato del testo di input
  const [search, setSearch] = useState("");

  // Stato per visualizzare il form di ricerca avanzata
  const [srcAdvanced, setSrcAdvanced] = useState(false);

  // Stato per radio selezionato
  const [selectedRadio, setSelectedRadio] = useState("");
  //Stato per check selezionati
  const [selectedCheck, setSelectedCheck] = useState({
    name: false,
    description: false,
  });
  // Stato per gestire errori
  const [errorParams, setErrorParams] = useState("");

  // Imposta di default radio su "brand" e check su "name" aggiornandosi al cambio search e brand
  useEffect(() => {
    if (thisBrand) {
      setSelectedRadio("brand");
      setSelectedCheck({ name: true, description: false });
    }
  }, [thisBrand, search]);

  // Aggiorna srcParams con dati form e verifica validità
  useEffect(() => {
    
    
    switch (selectedRadio) {
      case "brand":
        setErrorParams( selectedCheck.name === false && selectedCheck.description === false ? "brand" : "" ),
          setSrcParams({
            filter_name: selectedRadio,
            filter_value: {
              brand: thisBrand.name,
              srcText: search,
              in_name: selectedCheck.name,
              in_description: selectedCheck.description,
            },
          });
        break;

      case "global":
        setErrorParams(() => {
          if (search === "") {
            return "srcText";
          } 
          
          if (selectedCheck.name === false && selectedCheck.description === false) {
            return errorParams +"Global";
          } else {
            return "";
          }
        });

        setSrcParams({
          filter_name: selectedRadio,
          filter_value: { selectedCheck, srcText: search },
        });
        break;

      case "ean":
        //conrolla se numerico e se lungo 13
        setErrorParams(
         search !== "" && /^[0-9]+$/.test(search) && search.length === 13 ? "" : "ean"
        );
        setSrcParams({ filter_name: selectedRadio, filter_value: search });
        break;

      case "product_id":
        //conrolla se numerico e se lungo 6
        setErrorParams(
          search !== "" &&/^[0-9]+$/.test(search) && search.length === 6 ? "" : "product_id"
        );
        setSrcParams({ filter_name: selectedRadio, filter_value: search });
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
      // ON/OFF se esiste assegna valore false, se non esiste da valore di search (se non è vuoto/false) oppure true
      [key]: !prevState[key],
    }));
  };

 // Gestisce il submit del form che fa partire la ricerca
const handleSubmitForm = (e) => {
  e.preventDefault();

  // Controlla se ci sono errori nei parametri
  if (errorParams) {
    switch (errorParams) {
      case "brand":
      case "Global":
      case "srcText":
      case "srcTextGlobal":
        console.error(
          `Errore nella richiesta ${errorParams}: parametri non sufficienti`
        );
        return;

      case "ean":
      case "product_id": // Correzione: era scritto "product:_id"
        console.error(
          `Errore nella richiesta ${errorParams}: formato non valido`
        );
        return;

      default:
        console.error(`Errore sconosciuto: ${errorParams}`);
        return;
    }
  }

  //  stato del submit
  setIsSubmit(true);
  
  console.log("Inviato", search);
  
};


  return (
    <Form onSubmit={handleSubmitForm}>
      <InputGroup className="mb-3">
        {/* Mostra o nasconde i parametri di ricerca avanzata */}
        <Button
          variant="outline-secondary"
          id="button-addon1"
          onClick={() => setSrcAdvanced((prevState) => !prevState)}
        >
          {srcAdvanced ? <span>&#9650;</span> : <span>&#9660;</span>}
        </Button>
        <Button type="submit" variant="outline-secondary" >
          Cerca
        </Button>

        {/* Barra di ricerca */}
        <Form.Control
        className={ errorParams === "srcText" || errorParams === "srcTextGlobal" ? "src-error-class" : "" }
          type="search"
          placeholder="ricerca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      {/* Form di ricerca avanzata */}
      {thisBrand && srcAdvanced && (
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

          <Col
            className={
              errorParams === "Global" || errorParams === "srcTextGlobal" || errorParams === "brand"
                ? "src-error-class"
                : ""
            }
          >
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
            />
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
            />
          </Col>

          <Col>
            <Form.Check // EAN
              type="radio"
              id="filterEan"
              name="radioParams"
              checked={selectedRadio === "ean"}
              onChange={() => handleButtonRadioChange("ean")}
              label={
                <>
                  EAN
                  {errorParams === "ean" && (
                    <span className="invalid-message">
                      {" "}
                      (formato non valido)
                    </span>
                  )}
                </>
              }
            />
            <Form.Check // CODICE
              type="radio"
              id="filterProduct_id"
              name="radioParams"
              checked={selectedRadio === "product_id"}
              onChange={() => handleButtonRadioChange("product_id")}
              label={
                <>
                  Codice
                  {errorParams === "product_id" && (
                    <span className="invalid-message">
                      {" "}
                      (formato non valido)
                    </span>
                  )}
                </>
              }
            />
          </Col>
        </Row>
      )}
    </Form>
  );
}

export default ProductsSearchBar;
