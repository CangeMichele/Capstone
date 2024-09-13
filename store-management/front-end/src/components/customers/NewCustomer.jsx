// ----- API -----
import { postNewCustomer } from "../../services/apiCustomer.js";

export default async function NewCustomer( setIsLoading, formData, setToastMessage, CustomerFormReset, setShowCustomerToast) {
     
 // prende i dati di form data e ggiunge valore isActive
  const newCustomer = {
    ...formData,
    isActive: true,
  };

      //avvia loader
      setIsLoading(true);
      console.log(newCustomer);
      
      try {
        // API nuovo cliente
        const response = await postNewCustomer(newCustomer );

        // crea messaggi per toast
        setToastMessage({
          header: "Aggiunto ! ",
          body: `Aggiunto nuovo utente ${response.lastName} ${response.firstName} - ${response.taxCode}`,
        });

        // resetta form
        CustomerFormReset();
        
      } catch (error) {
        setToastMessage({
          header: "Errore nella modifica",
          body: "Controllare i parametri e riprovare. Se il problema persiste contattare l'assistenza.",
        });
      } finally {
        //ferma loader
        setIsLoading(false);
        //visualizza toast
        setShowCustomerToast(true);
      }

}
