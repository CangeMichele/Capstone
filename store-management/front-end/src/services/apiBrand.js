// ----- configurazion api -----
import api  from "./apiConfig";


// ***** BRAND ****

//GET -> Tutti i brand
export const getBrands = async () => {
    try{
      const response = await api.get("/brand");
      return response.data;
    } catch (error){
      console.error("Errore nella chiamata API getBrands", error);
      throw error;
    }
  };
  
  
  