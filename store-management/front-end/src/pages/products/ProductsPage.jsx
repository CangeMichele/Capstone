// ----- React -----
import React, { useState, useEffect } from "react";
// ----- Stilizzazione -----
import { Container } from "react-bootstrap";
// ----- API -----
import { getBrands } from "../../services/api.js";
// ----- Componenti -----
import ProductsData from "../../components/products/ProductsData.jsx";
import ProductsSearchBar from "../../components/products/ProductsSearchBar.jsx";


const Products = () => {
  // useState esterni per poterli utlizzare in tutti i componenti
  const [brands, setBrands] = useState([]);
  const [thisBrand, setThisBrand] = useState(null);

  const [search, setSearch] = useState("");
  const handleSearch = (e) => setSearch(e.target.value);


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
    <Container>

      {/* barra di ricerca */}
      <ProductsSearchBar 
      brands={brands} thisBrand={thisBrand} 
      search={search} handleSearch={handleSearch}
      />
      <h1>{search}</h1>

      {/* bottoni/schede brand */}
      <ProductsData brands={brands} thisBrand={thisBrand} setThisBrand={setThisBrand} 
     search={search} />

    </Container>
  );
};
export default Products;
