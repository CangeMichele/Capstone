// ----- configurazion api -----
import api  from "./apiConfig";


// ***** USER *****

// Login
export const loginUser = async (credentials) => {
    try {
        const response = await api.post("/auth/user", credentials);
        // console.log("Risposta API login:", response.data); // Log della risposta per debugging
        localStorage.setItem("token", response.data.token);
        return response.data;

    } catch (error) {
        console.error("Errore nella chiamata API di login:", error); // Log dell'errore per debugging
        console.log("credenzioali: " + { credentials });

        throw error;
    }
};

// Estrapolazione dati utente loggato  
export const getUserData = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await api.get("/auth/user", {
            headers: {
                Authorization: `Bearer ${token}`, // Aggiungi il token nell'header
            },
        });
        return response.data;

    } catch (error) {
        console.error("Errore nel recupero dei dati utente:", error); // Log dell'errore per debugging
        throw error;
    }
};
