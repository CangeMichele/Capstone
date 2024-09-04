// ----- mongoose -----
import mongoose from "mongoose";


// ----- Schema indirizzo
const AddressSchema = new mongoose.Schema({
    street: {
      type: String,
      required: true
    },
    streetNumber: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }, 
    province: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
    { _id: false } // evito di creare un _id per qesto sotto documento
  );

  // ----- Schema contatti 
const ContactsSchema = new mongoose.Schema({
  phone1: {
    type: String,
    required: true,
    trim: true
  },
  phone2: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  address: [AddressSchema],
}, { _id: false }); // evito di creare un _id per qesto sotto documento

export default ContactsSchema;
