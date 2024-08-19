// ----- React -----
import React from "react";
// ----- stilizzazione -----
import { Button, ButtonGroup } from "react-bootstrap";
// ----- componenti -----
import ProductsTable from "./ProductsTable.jsx";

function ProductsData({ brands, thisBrand, setThisBrand }) {
 


  return (
    <>
      <ButtonGroup aria-label="Basic example">
        
        {brands.map((brand, i) => (
          <Button
            key={i}
            variant={
              thisBrand && thisBrand.name === brand.name
                ? "primary"
                : "secondary"
            }
            onClick={() => setThisBrand(brand)}
          >
            {brand.name}
          </Button>
        ))}

      </ButtonGroup>

      {thisBrand && <ProductsTable brand={thisBrand}/>}
    </>
  );
}

export default ProductsData;
