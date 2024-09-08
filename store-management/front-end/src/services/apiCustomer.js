// ----- configurazione api -----
import api from "./apiConfig";


// ***** CUSTOMER ****


// POST -> nuovo cliente
export const postNewCustomer = async (newCustomer) => {
    try {
        const response = await api.post("/customers", newCustomer);
        return response.data;
    } catch (error) {
        console.error("Impossibile salvare nuovo cliente:", error);
        throw error; // Propaga l'errore per essere gestito a livello superiore
    }
}

// GET -> ricerca clienti
export const getSrcCustomers = async (customersParamas) => {

    try {
        // invio richiesta api
        const response = await api.get(`/customers`, {
            params: customersParamas,
         });

         return response.data;
         
        
    } catch (error) {
        console.error("Errore nella chiamata API getSrcCustomers:", error);
    throw error; // Propaga l'errore per essere gestito a livello superiore
    }

}


// PATCH -> modifica cliente
export const patchCustomer = async (editFields, idCustomer) => {
    console.log("editFields: ", editFields);
    console.log("idCustomer: ", idCustomer);
    
    try {
        // invio richiesta api
        const response = await api.patch(`customers/${idCustomer}`, editFields);
        return response.data;
    } catch (error) {
        console.error("Errore nella chiamata API patchCustomer:", error);
    throw error; // Propaga l'errore per essere gestito a livello superiore
    }
}