// ----- React -----
import React from "react";
// ----- stilizzazione -----
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";


function NavBrands({ brands, thisBrand, handleThisBrand }) {
 


  return (
    <>
    <ButtonToolbar className="mb-3">
      <ButtonGroup aria-label="Basic example">
        
        {brands.map((brand, i) => (
          <Button
            key={i}
            variant={
              thisBrand && thisBrand.name === brand.name
                ? "primary"
                : "secondary"
            }
            onClick={() => handleThisBrand(brand)}
          >
            {brand.name}
          </Button>
        ))}

      </ButtonGroup>
      </ButtonToolbar>

    
    </>
  );
}

export default NavBrands;
