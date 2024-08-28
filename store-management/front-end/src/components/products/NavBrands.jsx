// ----- React -----
import React from "react";
// ----- stilizzazione -----
import { Button, ButtonGroup } from "react-bootstrap";


function NavBrands({ brands, thisBrand, handleThisBrand }) {
 


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
            onClick={() => handleThisBrand(brand)}
          >
            {brand.name}
          </Button>
        ))}

      </ButtonGroup>

    
    </>
  );
}

export default NavBrands;
