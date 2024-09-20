// ----- React -----
import React, { useEffect } from "react";
//----- React-router-dom
import { useNavigate } from "react-router-dom";
// ----- stilizzazione -----
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function ProductsTable({
  srcResult,
  prodsBrand,
  pagination,
  handlePagination,
  thisBrand,
}) {
  // Destrutturo paginazione per gestire singolarmente gli stati
  const { currentPage, totalPages, limit } = pagination;

  // Gestore navigazione
  const navigate = useNavigate();

  const tableProdacts =
    srcResult && srcResult.length > 0
      ? srcResult
      : prodsBrand && prodsBrand.length > 0
      ? prodsBrand
      : "";

  return (
    <>
      {/* --- Se ci sono riusltati visualizzo i prodotti in formato tabella --- */}
      {tableProdacts && tableProdacts.length > 0 && (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="fixed-width-name">Name</th>
              <th className="fixed-width-brand">Brand</th>
              <th className="fixed-width-product-id">Product ID</th>
              <th className="fixed-width-category">Category</th>
              <th className="fixed-width-ean">EAN</th>
              <th className="fixed-width-price">Price</th>
              <th className="fixed-width-quantity">Quantity</th>
              <th className="fixed-width-in-stock">inStock</th>
              <th className="fixed-width-stock-quantity">Stock Quantity</th>
            </tr>
          </thead>
          <tbody>
            {tableProdacts &&
              tableProdacts.map((product) => (
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
      {tableProdacts && tableProdacts.length === 0 && <h3>Nessun dato trovato</h3>}

      {/* --- Barra di navigazione pagine --- */}
      <Row className="justify-content-center align-items-center my-4">
        <Col className="text-center">
          <Form className="d-flex justify-content-center align-items-center">
            <Button
              onClick={() =>
                handlePagination({ currentPage: Math.max(currentPage - 1, 1) })
              }
              disabled={currentPage === 1}
              className="mx-2"
              variant="outline-secondary"
              style={{ borderRadius: "10px" }}
            >
              <FaArrowLeft />
            </Button>
            <h5 className="d-inline mx-2">
              {currentPage} / {totalPages}
            </h5>
            <Button
              onClick={() =>
                handlePagination({
                  currentPage: Math.min(currentPage + 1, totalPages),
                })
              }
              disabled={currentPage === totalPages}
              className="mx-2"
              variant="outline-secondary"
              style={{ borderRadius: "10px" }}
            >
              <FaArrowRight />
            </Button>
            <Form.Select
              value={limit}
              onChange={(e) =>
                handlePagination({
                  limit: Number(e.target.value),
                  currentPage: 1,
                })
              }
              className="mx-2"
              style={{ width: "auto", borderRadius: "20px" }}
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
