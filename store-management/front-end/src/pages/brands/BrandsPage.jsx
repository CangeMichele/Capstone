// ----- React ----- 
import React, { useEffect, useState } from "react";
// ----- React-router-dom ----- 
import { useNavigate } from "react-router-dom";
// ----- API ----- 
import { getBrands } from "../../services/apiBrand.js";
// ----- Stilizzazione ----- 
import { Table, Spinner, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";


function BrandsPage() {
  const navigate = useNavigate();

  // Stato contenente tutti i documenti "brand" del db
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Al montaggio del componente estraggo tutti i brand del db
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getBrands();
        // Ordina i brand in base al nome
        const sortedBrands = brandsData.sort((a, b) => a.name.localeCompare(b.name));
        setBrands(sortedBrands);
      } catch (error) {
        setError("Errore nel recupero dei brand");
        console.error(`Errore nel recupero dei brand:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleRowClick = (brand) => {
    // Aggiorna thisBrand nel localStorage
    localStorage.setItem("thisBrand", JSON.stringify(brand));
    // Naviga alla pagina dei dettagli del brand
    navigate("/brands/details");
  };

  if (loading) {
    return <div className="text-center"><Spinner animation="border" /></div>;
  }

  if (error) {
    return <p className="text-center">{error}</p>;
  }

  return (
    <>
    <Button 
        variant="secondary" 
        onClick={() => navigate(-1)} 
        className="mb-3">
        <FaArrowLeft /> Indietro
      </Button>

      <h1 className="text-center mb-4">Brands</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Giorni di Ordine</th>
            <th>Giorni di Consegna</th>
            <th>Referente</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr 
              key={brand._id}
              onClick={() => handleRowClick(brand)}
              style={{ cursor: "pointer" }}
            >
              <td>{brand.name}</td>
              <td>{brand.supplier.orderDays.join(', ')}</td>
              <td>{brand.supplier.deliveryDays.join(', ')}</td>
              <td>{brand.supplier.contactPerson}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default BrandsPage;
