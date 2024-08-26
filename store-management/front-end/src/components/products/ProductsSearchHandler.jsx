import React, { useEffect, useState } from "react";
import { apiSrcInBrand, apiSrcInGlobal, apiSrcByEan, apiSrcByProductId } from "./ApiSearchFuntions.js";

function ProductsSearchHandler({
  thisBrand,
  srcParams,
  handlePagination,
  pagination,
  searchResult,
  handleLoader,
  isSubmit,
  handleSubmit
}) {
  const { currentPage, limit } = pagination;

  //Al montaggio del componente effetttua la chiamata per brand senza parametri per visualizzare thisBrand
  useEffect(() => {
    const defaultBrandFetch = async () => {
     
      handleLoader(true);
      
      try {
        const result = await apiSrcInBrand(thisBrand, srcParams, pagination);
        if (result) {
          searchResult(result.products);
          handlePagination({ totalPages: result.totalPages });
        }
      } catch (error) {
        console.error("Errore nella richiesta dei prodotti per brand:", error);
      } finally {
        handleLoader(false);
      }
    };

    if (thisBrand) {
      defaultBrandFetch();
    }
  }, [thisBrand]);

  
  //Al submit gestisce la ricerca tramite api 
  useEffect(() => {
    const fetchProductsOnSubmit = async () => {
      handleLoader(true);
      try {
        let result;
        switch (srcParams.filter_name) {
          case "brand":
            result = await apiSrcInBrand(thisBrand, srcParams, pagination);
            break;
          case "global":
            result = await apiSrcInGlobal(srcParams, pagination);
            break;
          case "ean":
            result = await apiSrcByEan(srcParams, pagination);
            break;
          case "product_id":
            result = await apiSrcByProductId(srcParams, pagination);
            break;
          default:
            console.error("Richiesta non riconosciuta");
            return;
        }

        if (result) {
          searchResult(result.products);  // Aggiorna i risultati di ricerca
          handlePagination({ totalPages: result.totalPages });  // Aggiorna la paginazione
        }
      } catch (error) {
        console.error("Errore nella richiesta dei prodotti:", error);
      } finally {
        handleLoader(false);
        handleSubmit(false);  // Reset del submit dopo l'esecuzione della ricerca
      }
    };

    if (isSubmit) {
      fetchProductsOnSubmit();
    }
  }, [isSubmit, srcParams, pagination.currentPage, pagination.limit]);

  return null;  // Questo componente non ha output visivo diretto
}

export default ProductsSearchHandler;
