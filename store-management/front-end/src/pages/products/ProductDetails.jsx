// ----- React ----- 
import React from "react";
// ----- React-router-dom ----- 
import { useLocation, useNavigate } from "react-router-dom";
// ----- Stilizzazione ----- 
import { Row, Col, Card, Button } from "react-bootstrap";
// ----- Icone ----- 
import { FaArrowLeft, FaUser } from "react-icons/fa";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate(); 

  // Recupera l'oggetto `product` e `thisBrand` dallo stato di `location`
  const { product } = location.state || {};
  const { thisBrand } = location.state || {}; 

  // Funzione per tornare alla pagina precedente
  const handleGoBack = () => {
    navigate(-1);
  };

  // Funzione per navigare alla pagina del brand
  const handleGoToBrand = () => {
    navigate('/brands/details');
  };

  return (
    <div className="product-details-container">
      <Button 
        variant="secondary" 
        onClick={handleGoBack} 
        className="mb-3">
        <FaArrowLeft /> Indietro
      </Button>
      
      {product ? (
        <Card className="product-card mb-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Card.Header as="h5" className="text-center bg-primary text-white">
            {product.name}
          </Card.Header>

          <Card.Body>
            <Row>
              <Col md={4} className="d-flex justify-content-center">
                <Card.Img
                  src="https://image.freepik.com/free-vector/pets-shop-logo-with-dog-cat-parrot-illustration_162786-75.jpg"
                  alt={product.name}
                  className="img-fluid rounded"
                />
              </Col>

              <Col md={8}>
                <Row className="mb-3">
                  <Col>
                    <Card.Text>
                      <strong>Descrizione:</strong> {product.description}
                    </Card.Text>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Card.Text>
                      <strong>EAN:</strong> {product.ean}
                    </Card.Text>
                  </Col>
                  <Col md={6}>
                    <Card.Text>
                      <strong>Codice:</strong> {product.product_id}
                    </Card.Text>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Card.Text>
                      <strong>Prezzo:</strong> € {product.price}
                    </Card.Text>
                  </Col>
                  <Col md={6}>
                    <Card.Text>
                      <strong>In Stock:</strong> {product.inStock ? "Sì" : "No"}
                    </Card.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>

          <Card.Body className="bg-light">
            <Row>
              <Col md={6}>
                <Card.Text>
                  <strong>Brand:</strong> {product.brand}
                </Card.Text>
                <Card.Text>
                  <strong>Categoria:</strong> {product.category}
                </Card.Text>
              </Col>
              <Col md={6}>
                <Card.Text>
                  <strong>Quantità:</strong> {product.quantity}
                </Card.Text>
                <Card.Text>
                  <strong>Giacenza:</strong> {product.stockQuantity}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>

          <Card.Footer className="text-center">
            <Card.Text>
              <strong>Ordini:</strong> {thisBrand.supplier.orderDays.join(', ')}
            </Card.Text>
            <Card.Text>
              <strong>Arrivi:</strong> {thisBrand.supplier.deliveryDays.join(', ')}
            </Card.Text>
            <Button variant="primary" onClick={handleGoToBrand}>
              <FaUser /> Fornitore
            </Button>
          </Card.Footer>
        </Card>
      ) : (
        <p className="text-center">Nessun dettaglio del prodotto disponibile.</p>
      )}
    </div>
  );
}

export default ProductDetails;
