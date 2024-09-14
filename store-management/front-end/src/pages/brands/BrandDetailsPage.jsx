// ----- React ----- 
import React, { useEffect, useState } from "react";
// ----- React-router-dom ----- 
import { useNavigate } from "react-router-dom";
// ----- Stilizzazione ----- 
import { Card, Button, ListGroup } from "react-bootstrap";
// ----- Icone ----- 
import { FaPhone, FaEnvelope, FaGlobe, FaArrowLeft } from "react-icons/fa";

function BrandDetailsPage() {
  const navigate = useNavigate();
  
  // Stato per memorizzare i dati del fornitore
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    // Recupera i dati dal localStorage
    const storedBrand = JSON.parse(localStorage.getItem("thisBrand"));

    if (storedBrand) {
      setSupplier(storedBrand.supplier);
    }
  }, []);

  // Se non ci sono dati, visualizza un messaggio di caricamento o errore
  if (!supplier) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Button 
        variant="secondary" 
        onClick={() => navigate(-1)} 
        className="mb-3">
        <FaArrowLeft /> Indietro
      </Button>
      
      <Card className="mb-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Card.Header as="h5" className="text-center">
          <img 
            src={supplier.logoUrl} 
            alt={supplier.name} 
            style={{ maxWidth: "150px" }} 
          />
          <div>{supplier.name}</div>
        </Card.Header>

        <Card.Body>
          <Card.Text>
            <strong>Indirizzo:</strong> {supplier.address}
          </Card.Text>
          <Card.Text>
            <strong>Sito Web:</strong> <a href={supplier.website} target="_blank" rel="noopener noreferrer">{supplier.website}</a>
          </Card.Text>

          <Card.Title>Dettagli Fornitore</Card.Title>
          <Card.Text>
            <strong>Referente:</strong> {supplier.contactPerson}
          </Card.Text>
          <Card.Text>
            <strong>Telefono:</strong> <FaPhone /> {supplier.phone}
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> <FaEnvelope /> {supplier.email}
          </Card.Text>
          <Card.Text>
            <strong>Indirizzo:</strong> {supplier.address}
          </Card.Text>
          <Card.Text>
            <strong>Sito Web:</strong> <a href={supplier.website} target="_blank" rel="noopener noreferrer">{supplier.website}</a>
          </Card.Text>

          <Card.Title>Metodi di Ordinazione</Card.Title>
          <ListGroup>
            {supplier.orderMethods.map((method, index) => (
              <ListGroup.Item key={index}>
                <strong>{method.method.charAt(0).toUpperCase() + method.method.slice(1)}:</strong> 
                {method.method === "online" && <FaGlobe />}
                {method.method === "phone" && <FaPhone />}
                {method.method === "email" && <FaEnvelope />}
                <a href={method.details} target="_blank" rel="noopener noreferrer"> {method.details}</a>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Card.Title>Giorni di Ordine e Consegna</Card.Title>
          <Card.Text>
            <strong>Giorni di Ordine:</strong> {supplier.orderDays.join(', ')}
          </Card.Text>
          <Card.Text>
            <strong>Giorni di Consegna:</strong> {supplier.deliveryDays.join(', ')}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default BrandDetailsPage;
