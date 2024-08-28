// ----- React -----
import React from "react";
//----- React-router-dom
import { useNavigate } from "react-router-dom";
// ----- stilizzazione -----
import { Table, Row, Col, Button, Form } from "react-bootstrap";

function ProductsTable({ srcResult, pagination, handlePagination, thisBrand }) {
  // Destrutturo paginazione per gestire singolarmente gli stati
  const { currentPage, totalPages, limit } = pagination;

  // Gestore navigazione
  const navigate = useNavigate();  
  

  return (
    <>
      {/* --- Se ci sono riusltati visualizzo i prodotti in formato tabella --- */}
      {srcResult && srcResult.length>0 && ( 
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Product ID</th>
            <th>Category</th>
            <th>EAN</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>inStock</th>
            <th>Stock Quantity</th>
          </tr>
        </thead>
        <tbody>
          {srcResult && srcResult.map((product) => (
            <tr
              key={product.product_id}
              onClick={() =>
                navigate(`details/${product.product_id}`, {
                  state: { product, thisBrand }, // Passa il brand corretto
                })
              }
            >
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.product_id}</td>
              <td>{product.category}</td>
              <td>{product.ean}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.inStock ? "si" : "no"}</td>
              <td>{product.stockQuantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
        )}
      
      {/* --- Se non ci sono riusltati visualizzo errore --- */}
        { srcResult && srcResult.length === 0 && (
          <h3>Nessun dato trovato</h3>
        )}

      {/* --- barra di navigazione pagine --- */}
      <Row className="justify-content-center align-items-center my-3">
        <Col className="text-center">
          <Form>
            <Button
              onClick={() => handlePagination({ currentPage: Math.max(currentPage - 1, 1) })}
              disabled={currentPage === 1}
              className="mx-2"
            >
              Back
            </Button>
            <h5 className="d-inline mx-2">
              {currentPage} / {totalPages}
            </h5>
            <Button
              onClick={() => handlePagination({ currentPage: Math.min(currentPage + 1, totalPages) })}
              disabled={currentPage === totalPages}
              className="mx-2"
            >
              Next
            </Button>
            <Form.Select
              value={limit}
              onChange={(e) => handlePagination({ limit: Number(e.target.value), currentPage: 1 })}
              className="mx-2"
              style={{ width: "auto" }}
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </Form.Select>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default ProductsTable;
