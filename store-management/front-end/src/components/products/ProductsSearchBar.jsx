import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import "./ProductsSearchBar.css";

function ProductsSearchBar({
  thisBrand,
  search,
  handleSearch,
  srcParams,
  setSrcParams,
}) {

  // Stato per visualizzare il form di ricerca avanzata
  const [srcAdvanced, setSrcAdvanced] = useState(false);
  // Stato per radio selezionato
  const [selectedRadio, setSelectedRadio] = useState("");
  //Stato per check selezionati 
  const [selectedCheck, setSelectedCheck] = useState({ name: false, description: false });
  // Stato per gestire errore check
  const [errorCheck, setErrorCheck] = useState(false)

  // Imposta di default radioParams su "brand" e "name" 
  useEffect(() => {
    if (thisBrand) {
      setSelectedRadio("brand");
      setSelectedCheck((prevState)=> ({
        ...prevState,
        name:true
      }))
    }
  }, [thisBrand]);





  // Sincronizza radio e search e popola srcParams
  useEffect(() => {
    switch (selectedRadio) {
     
      case "brand":
        setSrcParams({
          brand: thisBrand.name,
          checkParams: selectedCheck,
        });
        break;

      case "global":
        setSrcParams({
          global: true,
          checkParams: selectedCheck,
        });
        break;

      case "ean":
        setSrcParams({
          //conrolla se numerico e se lungo 13
          ean: (/^[0-9]+$/.test(search) && search.length === 13) ? search : "notValid",
        });
        break;

      case "product_id":
        setSrcParams({
           //conrolla se numerico e se lungo 6
           product_id: (/^[0-9]+$/.test(search) && search.length === 6) ? search : "notValid",
        });
        break;
    }
  
  }, [search, selectedRadio, selectedCheck]);





  // Gestisce il cambiamento del valore radio button
  const handleButtonRadioChange = (key) => {
    
    setSelectedRadio(key);
    // in caso di "brand" o "global" reimposta name a true
    if (key === "brand" || key === "global") {
      setSelectedCheck((prevState) => ({
        ...prevState,
        name: true, 
      }));
    }     
  };






  // Gestisce il cambiamento del valore check button
  const handleButtonCheckChange = (key) => {
    // ON/OFF se esiste assegna valore false, se non esiste da valore di search
    setSelectedCheck((prevState) => {
      const val = prevState[key] ? false : (search == "" ? true : search);
      return {
        ...prevState,
        [key]: val,
      };
    });
  };

  // Gestisce errore checkbox (se ean o global sono senza check)
  useEffect(()=>{
    setErrorCheck( 
      (selectedRadio === "brand" || selectedRadio === "global")
      &&
      (selectedCheck.name === false && selectedCheck.description === false)
      );
  },[selectedCheck, selectedRadio])






  // Gestisce il submit del form e fa partire la ricerca
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if( (selectedRadio === "brand" || selectedRadio === "global" ) && errorCheck){
      console.error("errore richiesta");
      return
    }else{

      console.log("Submit srcParams:", srcParams); // Logga srcParams al submit
      // Qui puoi anche aggiungere la logica per eseguire la ricerca
    }
  };





  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        {/* Mostra o nasconde i parametri di ricerca avanzata */}
        <Button
          variant="outline-secondary"
          id="button-addon1"
          onClick={() => setSrcAdvanced((prevState) => !prevState)}
        >
          Avanzate
        </Button>

        {/* Barra di ricerca */}
        <Form.Control
          type="search"
          placeholder="ricerca..."
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>

      {/* Form di ricerca avanzata */}
      {thisBrand && srcAdvanced && (
        <Row>
          <Col>
            <Button type="submit" variant="primary">
              Cerca
            </Button>
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

          <Col className={errorCheck ? 'src-error-class' : ''}>
            <Form.Check // NOME
              type="checkbox"
              id="filterName"
              name="checkParams"
              label="Nome prodotto"
              checked={selectedCheck.name ? true : false}
              onChange={() => handleButtonCheckChange("name")}
              disabled={selectedRadio === "ean" || selectedRadio ==="product_id" ? true : false}
            />
            <Form.Check // DESCRIZIONE
              type="checkbox"
              id="filterDescription"
              name="checkParams"
              label="Descrizione prodotto"
              checked={selectedCheck.description ? true : false}
              onChange={() => handleButtonCheckChange("description")}
              disabled={selectedRadio === "ean" || selectedRadio ==="product_id" ? true : false}

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
                  {srcParams.ean && srcParams.ean === "notValid" && (
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
                  {srcParams.product_id &&
                    srcParams.product_id === "notValid" && (
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
