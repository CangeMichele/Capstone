// ----- API -----
// Importa la funzione per aggiornare il cliente
import { patchCustomer } from "../../services/apiCustomer.js";
// ----- Lodash -----
// Importa lodash
import _ from "lodash";

export default async function UpdateCustomer(
  selectedCustomer,
  formData,
  setToastMessage,
  setShowCustomerToast,
  setIsLoading,
  CustomerFormReset
) {

  /* Funzione di paragone che utilizza libreria lodash per confrontare annidamenti,
  funzione ricorsiva (richiama se stessa) */
  const updatedFieldsCatcher = (originalObj, updatedObj) => {
    
    // Funzione di paragone
    const matchUpdate = (originalValue, updateValue) => {
      
      // Se entrambi sono array
      if (_.isArray(originalValue) && _.isArray(updateValue)) {
        const diff = _.cloneDeep(originalValue); //copia l'array

       // cicla l'array e sovrascrive solo elementi diversi
        for (let i = 0; i < updateValue.length; i++) {
          
          const itemDiff = updatedFieldsCatcher(originalValue[i], updateValue[i]); //rischiama se stessa
          
          if (itemDiff !== undefined) { //sovrascrive
            diff[i] = itemDiff; 
          }
        }

        return diff;
      }

      // Se entrambi sono oggetti
      if (_.isObject(originalValue) && _.isObject(updateValue)) {

        const diffResult = _.cloneDeep(originalValue); // copia l'oggetto
       
       // cicla l'oggetto e sovrascrive solo campi diversi
        _.forEach(updatedObj, (value, key) => {
         
          const itemDiff = updatedFieldsCatcher(originalObj[key], value); //risìchiama se stessa
          
          if (itemDiff !== undefined) {
            diffResult[key] = itemDiff; //sovrascrive campi diversi
          }
        });

        return diffResult;

      }

      // Ritorna il valore aggiornato se diverso
    return !_.isEqual(originalValue, updateValue) ? updateValue : originalValue;
    };

    return matchUpdate(originalObj, updatedObj);
  };

  // Esegui la funzione di paragone
  const updatedFields = updatedFieldsCatcher(selectedCustomer, formData);

  // Se non ci sono variazioni manda un messaggio e si ferma
  if (!Object.keys(updatedFields).length) {
    setToastMessage({
      header: "Non ci sono campi modificati",
      body: `Non è stata rilevata nessuna variazione per ${selectedCustomer.firstName} ${selectedCustomer.lastName} - ${selectedCustomer.taxCode}`,
    });
    setShowCustomerToast(true);
    return;
  }

  // Avvia loader
  setIsLoading(true);
  try {
    const idCustomer = selectedCustomer._id;

    const response = await patchCustomer(updatedFields, idCustomer);

    // Rende il risultato del paragone una stringa da usare per messaggio toast
    const updatedFieldsString = Object.entries(response)
      .map(([key, val]) => `${key}: ${val}`)
      .join("\n");

    // Crea messaggi per toast
    setToastMessage({
      header: "Modificato !",
      body: `Aggiornamento per ${selectedCustomer.lastName} ${selectedCustomer.firstName} - ${selectedCustomer.taxCode} 
      avvenuto con successo.`,
    });


    // Reset del form
    CustomerFormReset();
  } catch (error) {
    setToastMessage({
      header: "Errore nella modifica",
      body: "Controllare i parametri e riprovare. Se il problema persiste contattare l'assistenza.",
    });
  } finally {
    setIsLoading(false);


   // Aspettaprima di mostrare il toast per dare tempo alla pagina di risalire
   setTimeout(() => {
    setShowCustomerToast(true); 
  }, 250);
  }
}
