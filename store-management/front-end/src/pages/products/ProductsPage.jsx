// ----- React -----
import React, { useState, useEffect } from "react";
// ----- React-router-dom -----
import { useNavigate } from "react-router-dom";
// ----- Stilizzazione -----
import { Container, Row, Col, Button } from "react-bootstrap";
import "./ProductPage.css";
// ----- Icone -----
import { FaArrowLeft } from "react-icons/fa";
// ----- API -----
import { getBrands } from "../../services/apiBrand.js";
import { getProductsBrand } from "../../services/apiProducts.js";
// ----- Componenti -----
import NavBrands from "../../components/products/NavBrands.jsx";
import ProductsSearchBar from "../../components/products/ProductsSearchBar.jsx";
import ProductsTable from "../../components/products/ProductsTable.jsx";
// ----- Funzioni -----
import { productsSearchHandler } from "../../components/products/ProductsSearchHandler.js";

const ProductsPage = () => {
  // Navigazione
  const navigate = useNavigate();

  // Stato contenente tutti i documenti "brand" del db
  const [brands, setBrands] = useState([]);

  // Stato contenente "brand" selezionato
  const [thisBrand, setThisBrand] = useState(null);

  // Stato loader
  const [loader, setLoader] = useState(false);

  // Stato parametri di ricerca
  const [srcParams, setSrcParams] = useState({});

  // Stato contenente prodotti per brand
  const [prodsBrand, setProdsBrand] = useState();

  // Stato contenente risultato ricerca
  const [srcResult, setSrcResult] = useState();

  // Oggetto di stati per gestire impaginazione
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  });

  // Callback che gestisce il cambio valore di "brand"
  const handleThisBrand = (newBrand) => {
    setThisBrand(newBrand);
  };

  // Callback che gestisce loader
  const handleLoader = (status) => {
    setLoader(status);
  };

  // Callback che gestisce risultato ricerca
  const handlerSearchResult = (newResult) => {
    console.log("Nuovo risultato della ricerca:", newResult);
    setSrcResult(newResult);
  };

  // Callback che gestisce i valori di impaginazione
  const handlePagination = (newValue) => {
    setPagination((prevState) => ({
      ...prevState,
      ...newValue,
    }));
  };

  useEffect(()=>{
    console.log("DEBUG srcResult: NELLA PAGINA PRINCIPALE ", srcResult);
    
  }, [srcResult]);

  // Effetto per aggiornare srcResult quando thisBrand cambia
  useEffect(() => {
    handlerSearchResult(thisBrand);
  }, [thisBrand]);

  // Al montaggio componente estraggo tutti i brand del db e popolo thisBrand con il primo brand
  useEffect(() => {
    const fetchBrands = async () => {
      setLoader(true);
      try {
        const brandsData = await getBrands();
        // Ordina i brand in ordine alfabetico
        const sortedBrands = [...brandsData].sort((a, b) => a.name.localeCompare(b.name));
        
        setBrands(sortedBrands);
        handleThisBrand(sortedBrands[0]);

      } catch (error) {
        console.error(`Errore nel recupero dei brand:`, error);
      } finally {
        setLoader(false); // Assicurati di disattivare il loader anche in caso di errore
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    if (thisBrand) {
      //rendo disponibile this brand a tutte le pagine tramite localStorage
      localStorage.setItem("thisBrand", JSON.stringify(thisBrand));

      const fetchProductsForBrand = async () => {
        handleLoader(true);
        try {
          const prodResult = await getProductsBrand(
            thisBrand.name,
            srcParams,
            pagination,
          );
          
          console.log("DEBUG: sei qui");
          setProdsBrand(prodResult.products);
          handlePagination({ totalPages: prodResult.totalPages });
        } catch (error) {
          console.error("Errore nella richiesta dei prodotti:", error);
        } finally {
          handleLoader(false);
        }
      };

      fetchProductsForBrand();
    }
  }, [thisBrand, JSON.stringify(pagination)]);

  // Funzione per gestire la ricerca dei prodotti
  const handleSearch = async () => {
    await productsSearchHandler({
      thisBrand,
      srcParams,
      pagination,
      handleLoader,
      handlerSearchResult,
      handlePagination,
    });


   
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xl="2">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="mb-3"
          >
            <FaArrowLeft /> Indietro
          </Button>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <h1 className="me-2">Articoli</h1>

          <h3>- ricerca e visualizza</h3>
        </Col>
      </Row>

      <Row>
        {/* BARRA DI RICERCA - popola srcParams secondo i settaggi*/}
        <ProductsSearchBar
          thisBrand={thisBrand}
          srcParams={srcParams}
          setSrcParams={setSrcParams}
          handlerSearchResult={handlerSearchResult}
          handleLoader={handleLoader}
          pagination={pagination}
          handlePagination={handlePagination}
          handleSearch={handleSearch} 
          handleThisBrand ={handleThisBrand}
        />

        {/* NAVIGAZIONE BRAND - seleziona brand di riferimento */}
        <NavBrands
          brands={brands}
          thisBrand={thisBrand}
          handleThisBrand={handleThisBrand}
          srcResult = {srcResult}
          srcParams = {srcParams}
        />

        {/* TABELLA - visualizzazione prodotti */}
        {loader && <div>Loading...</div>}
        {thisBrand && (
          <ProductsTable
            srcResult={srcResult}
            prodsBrand={prodsBrand}
            pagination={pagination}
            handlePagination={handlePagination}
            thisBrand={thisBrand}
          />
        )}
      </Row>
    </Container>
  );
};

export default ProductsPage;
