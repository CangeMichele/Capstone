// ----- React -----
import React, { useEffect, useState } from "react";
// ----- Stilizzazione -----
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

  // Stato per validità formato ean/product_id
  const [isValidateForEan, setIsValidateForEan] = useState(true);
  const [isValidateForProd_id, setIsValidateForProd_id] = useState(true);

  // Stato errore check
  const [errorCheck, setErrorCheck] = useState(false);

  // Stato per tracciare selezione radio
  const [isEanSelected, setIsEanSelected] = useState(false);
  const [isProdIdSelected, setIsProdIdSelected] = useState(false);

  // Stato per tracciare selezione check
  const [isNameSelected, setIsNameSelected] = useState(true);
  const [isDescSelected, setIsDescSelected] = useState(false);

  // Imposta il parametro radioParams su brand e nome di default
  useEffect(() => {
    if (thisBrand) {
      setSrcParams((prevState) => ({
        ...prevState,
        radioParams: { brand: thisBrand.name },
      }));
      setIsNameSelected(true);
    }
  }, [thisBrand]);



  // Aggiorna dinamicamente "name" (se cliccato, valore)
  useEffect(() => {
    const val = isNameSelected ? search : false;
    setSrcParams((prevState) => ({
      ...prevState,
      checkParams: {
        ...prevState.checkParams,
        name: val,
      },
    }));
  }, [isNameSelected, search]);



  // Aggiorna dinamicamente "description" (se cliccato, valore)
  useEffect(() => {
    const val = isDescSelected ? search : false;
    setSrcParams((prevState) => ({
      ...prevState,
      checkParams: {
        ...prevState.checkParams,
        description: val,
      },
    }));
  }, [isDescSelected, search]);



  // Verifica se la stringa è numerica e della lunghezza corretta
  const srcNumControl = (str, numParam) => /^[0-9]+$/.test(str) && str.length === numParam;

  // Controlla validità formato ogni volta che cambia `search` o radio selezionato
  useEffect(() => {
    if (isEanSelected) {
      setIsValidateForEan(srcNumControl(search, 13));
    }
    if (isProdIdSelected) {
      setIsValidateForProd_id(srcNumControl(search, 6));
    }
  }, [search, isEanSelected, isProdIdSelected]);



  // Gestisce il cambiamento del valore radio button
  const handleRadioParamsChange = (key, value) => {
    
    if (key === "ean") {
      setIsEanSelected(true);
      setIsProdIdSelected(false);
      clearCheckParams();
      if (!isValidateForEan) {
        value = "notValid";
      }
    
    } else if (key === "product_id") {
      setIsProdIdSelected(true);
      setIsEanSelected(false);
      clearCheckParams();
      if (!isValidateForProd_id) {
        value = "notValid";
      }
   
    } else {
      setIsEanSelected(false);
      setIsProdIdSelected(false);
    }

    setSrcParams((prevState) => ({
      ...prevState,
      radioParams: { [key]: value },
    }));
  };



  // Gestisce il cambiamento del valore dei checkboxes
  const handleCheckParamsChange = (key) => {
    // Disabilita i checkParams se EAN o Product ID sono selezionati
    if (isEanSelected || isProdIdSelected) return;

    if (key === "name") {
      setIsNameSelected(!isNameSelected);
    }

    if (key === "description") {
      setIsDescSelected(!isDescSelected);
    }
  };

  // Rimuove i checkParams quando EAN o Product ID sono selezionati
  const clearCheckParams = () => {
    setSrcParams((prevState) => ({
      ...prevState,
      checkParams: search,
    }));
  };



  // Aggiorna dinamicamente errorCheck
  useEffect(() => {
    // Verifica se almeno un check è selezionato o se EAN/Prod ID sono attivi
    const noChecksSelected = !isNameSelected && !isDescSelected;
    const noRadioSelected = !isEanSelected && !isProdIdSelected;

    setErrorCheck(noChecksSelected && noRadioSelected);
  }, [isNameSelected, isDescSelected, isEanSelected, isProdIdSelected]);


  return (
    <>
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
        <Form>
          <Row>
            <Col>
              <Form.Check // BRAND
                type="radio"
                id="filterBrand"
                name="radioParams"
                checked={srcParams.radioParams.brand === thisBrand.name}
                onChange={() => handleRadioParamsChange("brand", thisBrand?.name)}
                label={thisBrand.name}
              />
              <Form.Check // GLOBALE
                type="radio"
                id="filterGlobal"
                name="radioParams"
                checked={srcParams.radioParams.global === true}
                onChange={() => handleRadioParamsChange("global", true)}
                label="Globale"
              />
            </Col>

            <Col className={errorCheck ? 'src-error-class' : ''}>
              <Form.Check // NOME
                type="checkbox"
                id="filterName"
                name="checkParams"
                checked={isNameSelected}
                onChange={() => handleCheckParamsChange("name")}
                label="Nome prodotto"
              />
              <Form.Check // DESCRIZIONE
                type="checkbox"
                id="filterDescription"
                name="checkParams"
                checked={isDescSelected}
                onChange={() => handleCheckParamsChange("description")}
                label="Descrizione prodotto"
              />
              {errorCheck && (
                <div className="error-message">
                  Seleziona almeno un filtro
                </div>
              )}
            </Col>

            <Col>
              <Form.Check // EAN
                type="radio"
                id="filterEan"
                name="radioParams"
                checked={srcParams.radioParams.ean === search && isValidateForEan}
                onChange={() => handleRadioParamsChange("ean", search)}
                label={
                  <>
                    EAN
                    {isEanSelected && !isValidateForEan && (
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
                checked={srcParams.radioParams.product_id === search && isValidateForProd_id}
                onChange={() => handleRadioParamsChange("product_id", search)}
                label={
                  <>
                    Codice
                    {isProdIdSelected && !isValidateForProd_id && (
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
        </Form>
      )}
    </>
  );
}

export default ProductsSearchBar;
