import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Products = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => setSearch(e.target.value); //metto la funzione nella variabile per passarla come parametro

  return (
    <>
      <Form.Group className="m-3">
        <Form.Control
          type="search"
          placeholder="cerca..."
          value={search}
          onChange={handleSearch}
        />
      </Form.Group>

      <h1>{search}</h1>
    </>
  );
};
export default Products;
