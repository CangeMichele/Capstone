// ----- API -----
import { formatDate } from "../../functions/formatDate.js";
import { postNewCustomer, getSrcCustomers } from "../../services/apiCustomer.js";
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

  console.log(response);
};

// ----- Gestore Modifica nuovo cliente -----
export const handleEditCustomer = async (editCustomer) => {
  console.log(editCustomer);
};

// -----  ----- ----- Ricerca cliente ----- ----- ----- 
export const handleSearchCustomer = async (srcParams, setSrcResult) => {
  
  const response= await getSrcCustomers(srcParams)
  console.log("response:", response);

  response.forEach(customer => {
    const formattedCustomer = dataFormFormat(customer);
    setSrcResult((prevSrcResult) => prevSrcResult.concat(formattedCustomer));
  });
  
};

