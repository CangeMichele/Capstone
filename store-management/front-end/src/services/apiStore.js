// ----- configurazion api -----
import api  from "./apiConfig";


// ***** STORE *****

// Login    
export const loginStore = async (credentials) => {
    try {
      const response = await api.post("/auth/store", credentials);
      console.log("Risposta API login:", response.data); // Log della risposta per debugging
      return response.data;
  
    } catch (error) {
      console.error("Errore nella chiamata API di login:", error); // Log dell'errore per debugging
      throw error;
    }
  };
// Estrapolazione dati punto vendita loggato  
export const getStoreData = async () => {
    try {
      const response = await api.get("/auth/store");
      return response.data;
  
    } catch (error) {
      console.error("Errore nel recupero dei dati punto vendita:", error); // Log dell'errore per debugging
      throw error;
    }
  };