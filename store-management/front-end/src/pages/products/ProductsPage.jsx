// ----- React -----
import React, { useState, useEffect } from "react";
// ----- Stilizzazione -----
import { Container } from "react-bootstrap";
// ----- API -----
import { getBrands } from "../../services/api.js";
// ----- Componenti -----
import BrandsProduct from "../../components/products/BrandsProduct.jsx";
import ProductsSearchBar from "../../components/products/ProductsSearchBar.jsx";
import ProductsTable from "../../components/products/ProductsTable.jsx";
// ----- funzioni -----
// import srcProductsFunction from "../../functions/srcProducts.js";

const Products = () => {
  // useState esterni per poterli utlizzare in tutti i componenti di ProductPage
  //BRAND
  const [brands, setBrands] = useState([]);
  const [thisBrand, setThisBrand] = useState(null);
  //RICERCA
  const [search, setSearch] = useState("");
  const handleSearch = (e) => setSearch(e.target.value);
  const [srcParams, setSrcParams] = useState({
    radioParams: {},
    checkParams: { name: false, description: false },
  });

  // all'avvio estraggo tutti i dati del primo brand
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

  // useEffect(() => {
  //   srcProductsFunction(srcParams, thisBrand);
  // }, [srcParams]);

  return (
    <Container>

      {/* barra di ricerca */}
      <ProductsSearchBar
        brands={brands}
        thisBrand={thisBrand}
        search={search}
        handleSearch={handleSearch}
        srcParams={srcParams}
        setSrcParams={setSrcParams}
      />
      <h1>{search}</h1>

      {/* bottoni/schede brand */}
      <BrandsProduct
        brands={brands}
        thisBrand={thisBrand}
        setThisBrand={setThisBrand}
      />

      {/* tabella prodotti */}
      {thisBrand && <ProductsTable brand={thisBrand} />}{" "}

    </Container>
  );
};
export default Products;
