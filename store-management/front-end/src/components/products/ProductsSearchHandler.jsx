// ----- React -----
import React, { useEffect, useState } from "react";
// ----- API -----
import {getProductsBrand  } from "../../services/apiProducts.js";

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
        let result;
        switch (srcParams.filter_name) {
          case "brand":            
            result = await getProductsBrand(thisBrand.name, srcParams, pagination);
            break;
          // case "global":
          //   result = await apiSrcInGlobal(srcParams, pagination);
          //   break;
          // case "ean":
          //   result = await apiSrcByEan(srcParams, pagination);
          //   break;
          // case "product_id":
          //   result = await apiSrcByProductId(srcParams, pagination);
          //   break;
          // default:
          //   console.error("Richiesta non riconosciuta");
          //   return;
        }

        if (result) {
          searchResult(result.products);  // Aggiorna i risultati di ricerca
          handlePagination({ totalPages: result.totalPages });  // Aggiorna la paginazione
        }
      } catch (error) {
        console.error("Errore nella richiesta dei prodotti:", error);
      } finally {
        handleLoader(false);
        setisSubmit(false);// Reset del submit dopo l'esecuzione della ricerca
          console.log("submit reset: ", isSubmit);
          
      }
    };

    if (isSubmit || thisBrand) {
      fetchProductsOnSubmit();
      
    }
    
  }, [isSubmit, thisBrand, currentPage, limit]);

  return null; 
}

export default ProductsSearchHandler;
