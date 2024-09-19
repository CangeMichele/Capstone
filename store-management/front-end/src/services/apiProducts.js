// ----- configurazion api -----
import api from "./apiConfig";


// ***** PRODUCTS ****

// ----- GET -> Prodotti del brand con ricerca
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



// ----- GET -> Tutti i prodotti del db con ricerca
export const getProductsGlobal = async (srcParams, pagination) => {
  try {

    //parametri query
    const queryParams = {
      page: pagination.currentPage,
      limit: pagination.limit,
      srcText: srcParams.filter_value.srcText,
      in_name: srcParams.filter_value.in_name,
      in_description: srcParams.filter_value.in_description,
    };

    // invio richiesta api
    const response = await api.get(`/products`, {
      params: queryParams,
    });

    return response.data;

  } catch (error) {
    console.error("Errore nella chiamata API getProductsGlobal:", error);
    throw error; // Propaga l'errore per essere gestito a livello superiore
  }
};




// ----- GET -> Prodotto per Ean
export const getProductByEan = async (ean) => {
  try {
    const response = await api.get(`/products/ean/${ean}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; 
    } else {
      console.error("Errore nella chiamata API getProductByProduct_id:", error);
      throw error;
    }
  }
};

// ----- GET -> Prodotto per Product_id (codice prodotto)
export const getProductByProduct_id = async (id) => {
  try {
    const response = await api.get(`/products/prod_id/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; 
    } else {
      console.error("Errore nella chiamata API getProductByProduct_id:", error);
      throw error; 
    }
  }
};

// ----- PATCH -> modifica prodotto
export const patchProduct = async(id, editFields) =>{

  try {
    const response = await api.patch(`/products/prod_id/${id}`, editFields);
    return response.data
    
  } catch (error) {
    console.error("Errore nella chiamata API patchProduct:", error);
    throw error; // Propaga l'errore per essere gestito a livello superiore
  }
}



