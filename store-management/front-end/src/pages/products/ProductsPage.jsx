// ----- React -----
import React, { useState, useEffect } from "react";
// ----- Stilizzazione -----
import { Container, Row, Col } from "react-bootstrap";
import "./ProductPage.css";
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
  // Stato contenente tutti i documenti "brand" del db
  const [brands, setBrands] = useState([]);

  // Stato contenente "brand" selezionato
  const [thisBrand, setThisBrand] = useState(null);
  
  // Stato loader
  const [loader, setLoader] = useState(false);

  // Stato parametri di ricerca
  const [srcParams, setSrcParams] = useState({});

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
    console.log('Nuovo risultato della ricerca:', newResult);
    setSrcResult(newResult);
  };

  // Callback che gestisce i valori di impaginazione
  const handlePagination = (newValue) => {
    setPagination((prevState) => ({
      ...prevState,
      ...newValue,
    }));
  };

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
        setBrands(brandsData);
        handleThisBrand(brandsData[0]);
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
          const prodResult = await getProductsBrand(thisBrand.name, srcParams, pagination);
          setSrcResult(prodResult.products);
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
      handlePagination
    });
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs="auto">
          <h1 className="me-2">Articoli</h1>
        </Col>
        <Col xs="auto">
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
          pagination = {pagination}
          handlePagination={ handlePagination}
          handleSearch={handleSearch} // Aggiungi la prop per gestire la ricerca
        />

        {/* NAVIGAZIONE BRAND - seleziona brand di riferimento */}
        <NavBrands
          brands={brands}
          thisBrand={thisBrand}
          handleThisBrand={handleThisBrand}
        />

        {/* TABELLA - visualizzazione prodotti */}
        {loader && <div>Loading...</div>}
        {thisBrand && (
          <ProductsTable
            srcResult={srcResult}
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
