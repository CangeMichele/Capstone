// ----- configurazion api -----
import api  from "./apiConfig";


// ***** PRODUCTS ****

// GET -> Tutti prodotti del brand
export const getProductsBrand = async (brand, srcParams, pagination) => {
  try {
    //parametri query
    const queryParams = {
      page: pagination.currentPage,
      limit: pagination.limit,
    };

    // Se srcText non è vuoto, aggiungi i parametri di ricerca
    if (srcParams.filter_value.srcText !== "") {
      queryParams.srcText = srcParams.filter_value.srcText;
      queryParams.in_name = srcParams.filter_value.in_name;
      queryParams.in_description = srcParams.filter_value.in_description;
    }

    // invio richiesta api
    const response = await api.get(`/products/brand/${brand}`, {
      params: queryParams,
    });

    return response.data;
  
  } catch (error) {
    console.error("Errore nella chiamata API getProductsBrand:", error);
    throw error; // Propaga l'errore per essere gestito a livello superiore
  }
};


// GET -> Prodotto per Ean
export const apiSrcByEan = async (ean)=>{
try {
  const response = await apiSrcByEan.get(`products/ean/${ean}`)
  return response;
} catch (error) {
  console.error("Errore nella chiamata API apiSrcByEan:", error);
    throw error; 
}
}

//tutti i prodotti con impaginazione
export const getAllProducts = async (currentPage, limit) => {
  try {
    const response = await api.get("/products", {
      params : {
        page: currentPage, 
        limit: limit
      },
    });
    return response.data;s
    
  } catch (error) {
    console.error("Errore nella chiamata API getAllProduct", error);
    throw error;
  }
};

  