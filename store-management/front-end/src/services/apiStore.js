// ----- configurazion api -----
import api  from "./apiConfig";


// ***** STORE *****

// GET -> tutti gli store
export const getAllStores = async () => {

  try {
      // invio richiesta api
      const response = await api.get(`/stores`)

       return response.data;
       
      
  } catch (error) {
      console.error("Errore nella chiamata API getAllStores:", error);
  throw error; // Propaga l'errore per essere gestito a livello superiore
  }

}