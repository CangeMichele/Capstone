// ----- React -----
import React, { useEffect, useState } from "react";
// ----- Stilizzazione -----
import { Tabs, Tab, Container } from "react-bootstrap";

function NavBrands({
  brands,
  thisBrand,
  handleThisBrand,
  srcResult,
  srcParams,
}) {
  // Stato valore tab selezionato
  const [key, setKey] = useState("");

  // Aggiorna tabs
  useEffect(() => {
    if (!key && thisBrand) {
      setKey(thisBrand.name);
    }
  }, [thisBrand, key]);

  return (
    <Container className="mb-1">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => {
          setKey(k);
          const selectedBrand = brands.find((brand) => brand.name === k);
          handleThisBrand(selectedBrand);
        }}
        className="mb-3 "
      >
        {brands.map((brand, i) => (
          <Tab
            eventKey={brand.name}
            title={
              <span
                style={{
                  fontWeight: key === brand.name ? "700" : "500",
                }}
              >
                {brand.name}
              </span>
            }
            key={i}
          >
            <div>
              <h4>
                {srcResult &&
                srcResult.length > 0 &&
                srcParams.filter_name !== "brand"
                  ? srcParams.filter_name === "global"
                    ? "Risultati su tutti i prodotti"
                    : srcParams.filter_name === "ean"
                    ? "Risultato prodotto per EAN"
                    : srcParams.filter_name === "product_id"
                    ? "Risultato prodotto per codice"
                    : ""
                  : brand.name}
              </h4>
            </div>
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
}

export default NavBrands;
