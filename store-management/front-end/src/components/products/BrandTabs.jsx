// ----- React -----
import React, { useEffect, useState } from "react";
// ----- API -----
import { getBrands } from "../../services/api";
// ----- stilizzazione -----
import { Button, ButtonGroup } from "react-bootstrap";
// ----- componenti -----
import ProductsList from "./ProductsList";

function BrandTabs() {
  const [brands, setBrands] = useState([]);
  const [thisBrand, setThisBrand] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getBrands();
        setBrands(brandsData);
        setThisBrand(brandsData[0]);
      } catch (error) {
        console.error(`Errore nel recupero dei brand:`, error);
      }
    };
    
    fetchBrands();
  }, []);

  return (
    <>
      <ButtonGroup aria-label="Basic example">
        {brands.map((brand, i) => (
          <Button 
          key={i} 
          variant={thisBrand && thisBrand.name === brand.name ? "primary" : "secondary"} 
          onClick={()=>setThisBrand(brand)}
          >
            {brand.name}
          </Button>
        ))}
      </ButtonGroup>
      {thisBrand && <ProductsList brand={thisBrand} />}
    </>
  );
}

export default BrandTabs;
