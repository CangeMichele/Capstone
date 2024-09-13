// ----- API -----
import { getSrcCustomers } from "../../services/apiCustomer.js";

export default async function CustomerSearch(
  setSrcResult,
  setSelectView,
  formData,
  setValidateSearch,
  setIsLoading,
  setToastMessage,
  setShowCustomerToast
) {
  // ----- RICERCA CLIENTE

  setSrcResult([]); //Array risultati
  setSelectView(false); //Mostra/nascondi risultati

 
 

  // Setta i campi come validi o null
  setValidateSearch({
    firstName: formData.firstName ? true : null,
    lastName: formData.lastName ? true : null,
    taxCode: formData.taxCode ? true : null,
  });

  // Popola parametri di riceca
  const srcParams = {
    firstName: formData.firstName ? formData.firstName : "",
    lastName: formData.lastName ? formData.lastName : "",
    taxCode: formData.taxCode ? formData.taxCode : "",
  };    

  setIsLoading(true);

  try {
    // esegue API ricerca cliente
    const response = await getSrcCustomers(srcParams);
    
    setSrcResult(response);
    
    // visulizza select
    setSelectView(true);
    // crea  parametri toast
    setToastMessage({
      header: "Ricerca completata con successo",
      body: `Trovati ${response.length} risultati per ${
        srcParams.taxCode
          ? srcParams.taxCode
          : `${srcParams.lastName} ${srcParams.firstName}`
      }`,
    });
  } catch (error) {
    // crea toast
    setToastMessage({
      header: "Errora nella ricerca",
      body: "Controllare i parametri e riprovare. Se il problema persiste contattare l'assistenza.",
    });
  } finally {
    //visualizza toast
    setShowCustomerToast(true);
    setIsLoading(false);
  }
}
