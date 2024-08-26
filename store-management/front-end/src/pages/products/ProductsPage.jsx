// ----- React -----
import React, { useState, useEffect } from "react";
// ----- Stilizzazione -----
import { Container } from "react-bootstrap";
// ----- API -----
import { getBrands } from "../../services/api.js";
// ----- Componenti -----
import NavBrands from "../../components/products/NavBrands.jsx";
import ProductsSearchBar from "../../components/products/ProductsSearchBar.jsx";
import ProductsSearchHandler from "../../components/products/ProductsSearchHandler.jsx";
import ProductsTable from "../../components/products/ProductsTable.jsx"

const ProductsPage = () => {
  //Stato contenente tutti i documenti "brand" del db
  const [brands, setBrands] = useState([]);
  // Stato contenente "brand" selezionato
  const [thisBrand, setThisBrand] = useState(null);
 
  //Stato parametri di ricerca
  const [srcParams, setSrcParams] = useState({});
  // Stato contenente risultato ricerca
  const [srcResult, setSrcResult] = useState();


  //Stato loader
  const[loader, setLoader] = useState(false)

// Satato submit
  const [isSubmit, setIsSubmit] = useState(false);
  // Callback che gestisce submit
  const handleSubmit = () => {
    setIsSubmit(true);
  };
  




  
  // Oggetto di stati per gestire impaginazione
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  });

 

  // Al montaggio componente estraggo tutti i brand del db e popolo thisBrand con il primo
  useEffect(() => {
    const fetchBrands = async () => {
      setLoader(true);
      try {
        const brandsData = await getBrands();
        setBrands(brandsData);
        setThisBrand(brandsData[0]);
      } catch (error) {
        console.error(`Errore nel recupero dei brand:`, error);
      }
    };

    fetchBrands();
  }, []);

  // Callback che gestisce invio form di ricerca
  const handleSearchSubmit = (newParams) => {
    setSrcParams(newParams);
  };

  //Callback che gestisce risultato ricerca
  const handlerSearchResult = (newResult) => {
    setSrcResult(newResult);
  }

  //Callback che gestisce loader
  const handleLoader = (status) =>{
    setLoader(status);
  }

// Callback che gestisce i valori di impaginazione
const handlePagination = (newValue) => {
  
  setPagination((prevState) => ({
    ...prevState,
    ...newValue,
  }));
};

  return (
    <Container>

      {/* BARRA DI RICERCA - popola srcParams secondo i settaggi*/}
      <ProductsSearchBar
        brands={brands}
        thisBrand={thisBrand}
        srcParams={srcParams}
        setSrcParams={setSrcParams}
        onSearchSubmit={handleSearchSubmit}
        handleSubmit={handleSubmit}
      />

      {/* NAVIGAZIONE BRAND - seleziona brand di riferiemnto */}
      <NavBrands
        brands={brands}
        thisBrand={thisBrand}
        setThisBrand={setThisBrand}
      />

      {/* RICERCA - se submit, api secondo srcParams*/}
      {Object.keys(srcParams).length>0 && (
        <ProductsSearchHandler
          thisBrand={thisBrand}
          srcParams={srcParams}

          handlePagination={handlePagination}
          pagination = {pagination}

          searchResult={handlerSearchResult}
          srcResult={srcResult}
          
          handleLoader={handleLoader}
          
          isSubmit={isSubmit}
          handleSubmit={handleSubmit}
        />
      )}

      {/* TABBELLA - visualizzazione prodotti */}
   
      {loader && (<div>Loading...</div>)}
      {thisBrand &&  (
        <ProductsTable srcResult={srcResult} pagination={pagination} handlePagination={handlePagination} thisBrand={thisBrand}
        />
      )}{" "}
    </Container>
  );
};
export default ProductsPage;
