// ----- mongoose ----- 
import mongoose from "mongoose";
// ----- schema esterni ----
import ContactsSchema from "./Contacts.js";

// ----- Schema clienti
const CostumerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  taxCode: {
    type: String,
    required: true,
    trim: true
  },
  birthDate: { 
    type: Date, 
    required: true 
  },
  placeOfBirth:{
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true},
    country: { type: String, required: true, default: "Italia" },
  },
  sex: {
    type: String,
    required: true,
    enum: ["M", "F"]
  },
  contacts: [
    ContactsSchema
  ],
  cardCode: {
    type: String,
    required: true,
    trim: true
  },
  registrationStore: {
    type: String,
    required: true,
    trim: true
  },
  registrationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  preferredStore: {
    type: String,
    required: true,
    trim: true
  },
  lastStore: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
 
}, {
  timestamps: true,
  collection: "costumer",
});


export default mongoose.model("Costumer", CostumerSchema);
