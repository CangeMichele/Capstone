// ----- React -----
import React, { useEffect, useState } from "react";
// ----- API -----
import {getProductsBrand, getProductByEan, getProductByProduct_id, getProductsGlobal  } from "../../services/apiProducts.js";

function ProductsSearchHandler({
  thisBrand,
  srcParams,
  handlePagination,
  pagination,
  searchResult,
  handleLoader,
  isSubmit,
  setisSubmit

}) {
  const { currentPage, limit } = pagination;  
  
  
  useEffect(() => {
    const fetchProductsOnSubmit = async () => {
      handleLoader(true);
      try {
        let prodResult = {};
        switch (srcParams.filter_name) {
          
          case "brand":            
          prodResult = await getProductsBrand(thisBrand.name, srcParams, pagination);  
            break;
         
             case "global":
              prodResult = await getProductsGlobal(srcParams, pagination);

             break;

           case "ean":
            prodResult = await getProductByEan(srcParams.filter_value);
             break;

           case "product_id":
            prodResult = await getProductByProduct_id(srcParams.filter_value);

             break;

           default:
             console.error("Richiesta non riconosciuta");
             return;
        }

        if (prodResult) {

          searchResult(prodResult.products);  // Aggiorna i risultati di ricerca
          handlePagination({ totalPages: prodResult.totalPages });  // Aggiorna la paginazione
        }
      } catch (error) {
        console.error("Errore nella richiesta dei prodotti:", error);
      } finally {
        handleLoader(false);
        // setisSubmit(false);// Reset del submit dopo l'esecuzione della ricerca
          
      }
    };

    if (isSubmit || thisBrand) {
      fetchProductsOnSubmit();
      
    }
    
  }, [isSubmit, thisBrand, currentPage, limit]);

  return null; 
}

export default ProductsSearchHandler;
