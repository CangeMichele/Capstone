// ----- React -----
import React from "react";
//----- React-router-dom
import { useLocation, useNavigate } from "react-router-dom";
// ----- stilizzazione -----
import { Row, Col, Card, Button } from "react-bootstrap";

function ProductDetails() {
  
  const location = useLocation();
  const navigate = useNavigate(); 

  const { product } = location.state || {}; // Recupera l'oggetto product
  const { brand } = location.state || {}; // Recupera l'oggetto product
  

  return (
    <div>
      {product ? (
        <Card className="mb-3" style={{ maxWidth: "600px" }}>
          
          <Card.Header as="h5" className="text-center">
            <Button  variant="secondary" onClick={() => navigate(-1)} className="mr-2">indietro</Button>
            {product.name}
          </Card.Header>
         
          <Card.Body>
            <Row>
              <Col xs={4}>
                <Card.Img
                  // src={product.imageUrl} TO DO : URL CLOUDINARY
                  src="https://image.freepik.com/free-vector/pets-shop-logo-with-dog-cat-parrot-illustration_162786-75.jpg"
                  alt={product.name}
                  className="img-fluid rounded-start"
                />
              </Col>
              <Col xs={8}>
                <Row>
                  <Col>
                    <Card.Text>
                      <b>Descrizione:</b> {product.description}
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text>
                      <b>ean:</b> {product.ean}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>
                      <b>codice:</b> {product.product_id}
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text>
                      <b>Prezzo:</b> € {product.price}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>
                      <b>In Stock:</b> {product.inStock ? "Sì" : "No"}
                    </Card.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>

          <Card.Body>
            <Card.Text>
              <b>Brand:</b> {product.brand}
            </Card.Text>
            <Card.Text>
              <b>Categoria:</b> {product.category}
            </Card.Text>
            <Card.Text>
              <b>Quantità:</b> {product.quantity}
            </Card.Text>
            <Card.Text>
              <b>Giacenza:</b> {product.stockQuantity} 
            </Card.Text>
          </Card.Body>

          <Card.Footer>
            <Card.Text>
              <b>Ordini:</b> {brand.supplier.orderDays.join(', ')} 
            <Card.Text>
            </Card.Text>
              <b>Arrivi:</b> {brand.supplier.deliveryDays.join(', ')} 
            </Card.Text>
            <Button>Fornitore</Button>
          </Card.Footer>
          

        </Card>
      ) : (
        <p>No product details available.</p>
      )}
    </div>
  );
}

export default ProductDetails;
