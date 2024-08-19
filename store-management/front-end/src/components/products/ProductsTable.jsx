// ----- React -----
import React, { useEffect, useState } from "react";
//----- React-router-dom
import { useNavigate } from "react-router-dom";
// ----- API -----
import { getProductsPage, getAllProducts } from "../../services/api";
// ----- stilizzazione -----
import { Table, Row, Col, Button, Form } from "react-bootstrap";

function ProductsTable({ brand}) {
  //per impaginazione
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    //richiama prodotti per brand con impaginazione
    const fetchProductsBrand = async () => {
      setLoading(true);
      try {
        const response = await getProductsPage(brand.name, currentPage, limit);

        setProducts(response.productsBrand);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Errore nella richieta prodotti per brand:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsBrand();

  
  }, [brand, currentPage, limit]);
  return (
    <>
      {loading && <div>Loading...</div>}

      {/* --- visualizzo i podotti in formato tabella --- */}
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
          {products.map((product, index) => (
            <tr key={product.product_id}  
            onClick={() =>
              navigate(`details/${product.product_id}`, {
                state: { product, brand  }
              })
            }>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.product_id}</td>
              <td>{product.category}</td>
              <td>{product.ean}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.inStock ? "si" : " no"}</td>
              <td>{product.stockQuantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* --- barra di navigazione pagine --- */}
      <Row className="justify-content-center align-items-center my-3">
        <Col className="text-center">
          <Form>
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-2"
            >
              Back
            </Button>
            <h5 className="d-inline mx-2">
              {currentPage} / {totalPages}{" "}
            </h5>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="mx-2"
            >
              Next
            </Button>
            <Form.Select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setCurrentPage(1);
              }}
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
