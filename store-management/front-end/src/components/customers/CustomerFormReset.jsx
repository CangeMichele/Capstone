// ----- React -----
import React from "react";

export default function CustomerFormReset(toResetParams) {
    
    // Estrapolazione stati da props
    const [
        setFormData,
        setLayout,
        setValidatedAll,
        setValidateSearch,
        setSrcResult,
        setSelectView,
        setToastMessage,
    ] = toResetParams;

    // Modello vuoto di riferimento
    const newFormData = {
    firstName: "",
    lastName: "",
    taxCode: "",
    birthDate: "",
    birthCity: "",
    birthProvince: "",
    birthCountry: "Italia",
    sex: "M",
    phone1: "",
    phone2: "",
    email: "",
    addressStreet: "",
    addressStreetNumber: "",
    addressCity: "",
    addressProvince: "",
    addressPostalCode: "",
    addressCountry: "",
    cardCode: "",
    registrationStore: "",
    registrationDate: new Date().toISOString().split("T")[0],
    preferredStore: "",
    isActive: "",
  };

  // Reset degli stati 
  setFormData(newFormData);
  setLayout("");
  setValidatedAll(null);
  setValidateSearch({
    firstName: null,
    lastName: null,
    taxCode: null,
  });
  setSrcResult([]);
  setSelectView(false);
  setToastMessage/({
    header:"",
    body:"",
  })
}
