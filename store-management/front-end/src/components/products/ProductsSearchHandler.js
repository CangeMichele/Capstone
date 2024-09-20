// ----- API ----- 
import { getProductsBrand, getProductByEan, getProductByProduct_id, getProductsGlobal } from "../../services/apiProducts.js";

export const productsSearchHandler = async ({ 
  thisBrand, 
  srcParams, 
  pagination, 
  handleLoader, 
  handlerSearchResult, 
  handlePagination, 
   }) => {

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
      handlerSearchResult(prodResult.products);  // Aggiorna  risultati ricerca
      handlePagination({ totalPages: prodResult.totalPages });  // Aggiorna paginazione
    }
  } catch (error) {
    console.error("Errore nella richiesta dei prodotti:", error);
  } finally {
    handleLoader(false);
  }
};
