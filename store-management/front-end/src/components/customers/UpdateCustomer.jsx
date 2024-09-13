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
  console.log("selectedCustomer in update", selectedCustomer);

  /* Funzione di paragone che utilizza libreria lodash per confrontare annidamenti,
  funzione ricorsiva (richiama se stessa) */
  const updatedFieldsCatcher = (originalObj, updatedObj) => {
    // Funzione di paragone
    const matchUpdate = (originalValue, updateValue) => {
      // Se entrambi sono array
      if (_.isArray(originalValue) && _.isArray(updateValue)) {
        const diff = [];

        // Gestisce array con oggetti o valori primari
        for (let i = 0; i < Math.max(originalValue.length, updateValue.length); i++) {
          const itemDiff = updatedFieldsCatcher(
            originalValue[i],
            updateValue[i]
          );
          if (itemDiff !== undefined) {
            diff[i] = itemDiff;
          }
        }

        return diff.length > 0 ? diff : undefined;
      }

      // Se entrambi sono oggetti
      if (_.isObject(originalValue) && _.isObject(updateValue)) {
        const diffResult = {};
        _.forEach(updatedObj, (value, key) => {
          const itemDiff = updatedFieldsCatcher(
            originalObj[key],
            value
          );
          if (itemDiff !== undefined) {
            diffResult[key] = itemDiff;
          }
        });

        return _.isEmpty(diffResult) ? undefined : diffResult;
      }

      // Confronto diretto dei valori
      return !_.isEqual(originalValue, updateValue) ? updateValue : undefined;
    };

    return matchUpdate(originalObj, updatedObj);
  };

  // Esegui la funzione di paragone
  const updatedFields = updatedFieldsCatcher(selectedCustomer, formData);
  console.log("updatedFields: ", updatedFields);

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
      avvenuto con successo. Nuovi parametri: ${updatedFieldsString}`,
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
    // Visualizza toast
    setShowCustomerToast(true);
  }
}
