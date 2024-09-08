// ----- API -----
import { postNewCustomer, getSrcCustomers, patchCustomer } from "../../services/apiCustomer.js";
// ----- Funzioni -----
import { dataFormFormat } from "./dataFormFormat.js";

// ----- ----- ----- Gestore creazione nuovo cliente ----- ----- -----
export const handleNewCustomer = async (customerData) => {
  // Oggetto da inviare
  const newCustomer = {
    firstName: customerData.firstName,
    lastName: customerData.lastName,
    taxCode: customerData.taxCode,
    birthDate: customerData.birthDate,
    placeOfBirth: {
      city: customerData.birthCity,
      province: customerData.birthProvince,
      country: customerData.birthCountry,
    },
    sex: customerData.sex,
    contacts: {
      phone1: customerData.phone1,
      phone2: customerData.phone2,
      email: customerData.email,
      address: {
        street: customerData.addressStreet,
        streetNumber: customerData.addressStreetNumber,
        city: customerData.addressCity,
        province: customerData.addressProvince,
        postalCode: customerData.addressPostalCode,
        country: customerData.addressCountry,
      },
    },
    cardCode: customerData.cardCode,
    registrationStore: customerData.registrationStore,
    preferredStore: customerData.preferredStore,
    registrationDate: customerData.registrationDate,
  };
  console.log("newCustomer: ", JSON.stringify(newCustomer));

  const response = await postNewCustomer(newCustomer);
};

// ----- ----- ----- Gestore Modifica cliente ----- ----- -----
export const handleEditCustomer = async (editCustomer, selectedCustomer) => {

  const idCustomer = selectedCustomer.id;
  const editFields = {};

  // Confronta editCustomer e selectedCustomer e popola editFields
  Object.keys(selectedCustomer).forEach((key) => {
    if (selectedCustomer[key] !== editCustomer[key]) {
      editFields[key] = editCustomer[key];
    }
  });

  if (!Object.keys(editFields).length) {
    return;
  }

  console.log("editFields: ", editFields);

  const response = await patchCustomer(editFields, idCustomer);
  console.log(response);
};

// -----  ----- ----- Ricerca cliente ----- ----- -----
export const handleSearchCustomer = async (srcParams) => {
  const response = await getSrcCustomers(srcParams);
  const formattedCustomer = [];
  response.forEach((customer) => {
    formattedCustomer.push(dataFormFormat(customer));
  });

  return formattedCustomer;
};
