import axios from "axios";

// ----- Configurazione endpoint axios
const API_URL = "http://localhost:3000/api";
const api = axios.create({
    baseURL: API_URL,
});

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

// ----- FUNZIONI RICHIESTE API ----- //

// LOGIN USER
export const loginUser = async (credentials) => {
    try {
      const response = await api.post("/auth/user", credentials);
      console.log("Risposta API login:", response.data); // Log della risposta per debugging
      return response.data; 

    } catch (error) {
      console.error("Errore nella chiamata API di login:", error); // Log dell'errore per debugging
      console.log("credenzioali: "+{credentials});
      
      throw error; 
    }
  };

  // GET USER  DATA (dati utente loggato)  
  export const getUserData = async () => {
    try {
      const response = await api.get("/auth/user"); 
      return response.data;

    } catch (error) {
      console.error("Errore nel recupero dei dati utente:", error); // Log dell'errore per debugging
      throw error;
    }
  };

  // LOGIN STORE    
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

  // GET STORE  DATA (dati punto vendita loggato)  
  export const getStoreData = async () => {
    try {
      const response = await api.get("/auth/store"); 
      return response.data;

    } catch (error) {
      console.error("Errore nel recupero dei dati punto vendita:", error); // Log dell'errore per debugging
      throw error;
    }
  };

  


  export default api;