// ----- React -----
import React, { useState } from "react";
// ----- Stilizzazione -----
import { Form } from "react-bootstrap";
// ----- Componenti -----
import BrandTabs from "../../components/products/BrandTabs.jsx";


const Products = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => setSearch(e.target.value); //metto la funzione nella variabile per passarla come parametro

  return (
    <>
    {/* barra di ricerca */}
      <Form.Group >
        <Form.Control
          type="search"
          placeholder="cerca..."
          value={search}
          onChange={handleSearch}
        />
      </Form.Group>

      {/* bottoni/schede brand */}
      <BrandTabs />

      {/*elenco prodotti*/}

      <h1>{search}</h1>
    </>
  );
};
export default Products;
