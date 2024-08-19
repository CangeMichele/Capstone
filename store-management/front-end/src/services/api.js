import axios from "axios";

// ----- Configurazione endpoint axios
const API_URL = "http://localhost:3000/api";
const api = axios.create({
  baseURL: API_URL,
});

// ----- aggiunge il token a tutte le richeste api
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("Token inviato:", token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// *************** FUNZIONI RICHIESTE API *************** //

// ----- USER --------------------------------------------------------------------------------------------------------------
//login
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/user", credentials);
    console.log("Risposta API login:", response.data); // Log della risposta per debugging
    return response.data;

  } catch (error) {
    console.error("Errore nella chiamata API di login:", error); // Log dell'errore per debugging
    console.log("credenzioali: " + { credentials });

    throw error;
  }
};
// (dati utente loggato)  
export const getUserData = async () => {
  try {
    const response = await api.get("/auth/user");
    return response.data;

  } catch (error) {
    console.error("Errore nel recupero dei dati utente:", error); // Log dell'errore per debugging
    throw error;
  }
};





// ----- STORE --------------------------------------------------------------------------------------------------------------
// login    
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
//(dati punto vendita loggato)  
export const getStoreData = async () => {
  try {
    const response = await api.get("/auth/store");
    return response.data;

  } catch (error) {
    console.error("Errore nel recupero dei dati punto vendita:", error); // Log dell'errore per debugging
    throw error;
  }
};





// ----- BRAND --------------------------------------------------------------------------------------------------------------
//tutti i brand
export const getBrands = async () => {
  try{
    const response = await api.get("/brand");
    return response.data;
  } catch (error){
    console.error("Errore nella chiamata API getBrands", error);
    throw error;
  }
};




// ----- PRODUCTS -----------------------------------------------------------------------------------------------------------
//prodotti per brand
export const getProductsBrand = async (brand) => {
  try {
    const response = await api.get(`/products/${brand}`);
      return response.data;
    
  } catch (error) {
    console.error("Errore nella chiamata API getProductsBrand", error)
  }
};

//prodotti per brand con impaginazione
export const getProductsPage = async (brand, currentPage, limit) =>{
  try {
    const response = await api.get(`/products/${brand}`, {
      params: {
          page: currentPage,
          limit: limit
      },
  });
  return response.data;

  } catch (error) {
    console.error("Errore nella chiamata API getProductsPage", error);
    throw error;
  }
};

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

  






export default api;