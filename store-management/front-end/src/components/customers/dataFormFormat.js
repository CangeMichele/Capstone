// ----- funzioni -----
import { formatDate } from "../../functions/formatDate";


export const dataFormFormat = (customer) => {
    console.log("dataFormFormat: customer",customer);

    // Check if placeOfBirth is defined
    const placeOfBirth = customer.placeOfBirth || {};

    // Check if contacts array exists and has at least one element
    const contact = customer.contacts && customer.contacts.length > 0 ? customer.contacts[0] : {};

    // Check if address array exists within contact and has at least one element
    const address = contact.address && contact.address.length > 0 ? contact.address[0] : {};

    const formData = {
        firstName: customer.firstName,
        lastName: customer.lastName,
        taxCode: customer.taxCode,

        birthDate: formatDate(customer.birthDate,"yyyy-MM-dd"),
        birthCity: placeOfBirth.city || '',
        birthProvince: placeOfBirth.province || '',
        birthCountry: placeOfBirth.country || '',
        sex: customer.sex,

        phone1: contact.phone1 || '',
        phone2: contact.phone2 || '',
        email: contact.email || '',

        addressStreet: address.street || '',
        addressStreetNumber: address.streetNumber || '',
        addressCity: address.city || '',
        addressProvince: address.province || '',
        addressPostalCode: address.postalCode || '',
        addressCountry: address.country || '',

        cardCode: customer.cardCode,
        registrationStore: customer.registrationStore,
        registrationDate: formatDate(customer.registrationDate,"yyyy-MM-dd"),
        lastStore: customer.lastStore || '',
        preferredStore: customer.preferredStore || '',
        isActive: customer.isActive ? "ATTIVA" : "NON ATTIVA",
    };
    console.log("formData: ", formData);
    

    return formData;
}
