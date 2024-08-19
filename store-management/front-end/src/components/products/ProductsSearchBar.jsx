// ----- React -----
import React, { useEffect, useState } from "react";
// ----- Stilizzazione -----
import { Form, InputGroup, Button } from "react-bootstrap";

function ProductsSearchBar({ thisBrand, search, handleSearch }) {
  const [srcAdvanced, setSrcAdvanced] = useState(false);

  const [srcParams, setSrcParams] = useState({
    radioParams: {},
    checkParams: { name: false, description: false }, 
  });

  useEffect(() => {
    if (thisBrand) {
      setSrcParams((prevState) => ({
        ...prevState,
        radioParams: { brand: thisBrand.name },
      }));
    }
  }, [thisBrand]);

  const handleRadioParamsChange = (key, value) => {
    setSrcParams((prevState) => ({
      ...prevState,
      radioParams: { [key]: value },
    }));
  };

  const handleCheckParamsChange = (key) => {
    setSrcParams((prevState) => ({
      ...prevState,
      checkParams: {
        ...prevState.checkParams,
        // Se ha valore, mette false; se è false, mette valore search
        [key]: prevState.checkParams[key] ? false : search,
      },
    }));
  };

  // DEBUG
  useEffect(() => {
    console.log(srcParams);
  }, [srcParams]);

  return (
    <>
      <InputGroup className="mb-3">
        {/* Visualizza paramentri ricerca avanzata */}
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
        <>
          <Form>
            <Form.Check
              type="radio"
              id="filterBrand"
              name="radioParams"
              checked={srcParams.radioParams.brand === thisBrand.name}
              onChange={() => handleRadioParamsChange("brand", thisBrand?.name)}
              label={thisBrand.name}
            />
            <Form.Check
              type="radio"
              id="filterGlobal"
              name="radioParams"
              checked={srcParams.radioParams.brand === false}
              onChange={() => handleRadioParamsChange("brand", false)}
              label="Globale"
            />
            <Form.Check
              type="radio"
              id="filterEan"
              name="radioParams"
              checked={srcParams.radioParams.ean === search}
              onChange={() => handleRadioParamsChange("ean", search)}
              label="Ean"
            />
            <Form.Check
              type="radio"
              id="filterProduct_id"
              name="radioParams"
              checked={srcParams.radioParams.product_id === search}
              onChange={() => handleRadioParamsChange("product_id", search)}
              label="Codice"
            />

            <Form.Check
              type="checkbox"
              id="filterName"
              name="checkParams"
              checked={srcParams.checkParams.name === search}
              onChange={() => handleCheckParamsChange("name")}
              label="Nome prodotto"
            />
            <Form.Check
              type="checkbox"
              id="filterDescription"
              name="checkParams"
              checked={srcParams.checkParams.description === search} 
              onChange={() => handleCheckParamsChange("description")} 
              label="Descrizione prodotto"
            />
          </Form>
        </>
      )}
    </>
  );
}

export default ProductsSearchBar;
