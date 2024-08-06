import mongoose from "mongoose";
import bcrypt from "bcrypt";

// ----- Schema orario apertura
const OpeningHoursSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']
    },
    open: { type: String, required: true },
    close: { type: String, required: true }
  },
  { _id: false } // evito di creare un _id per qesto sotto documento
);

// ----- Schema indirizzo
const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
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
const ContactsSchema = new mongoose.Schema(
  {
    phone1: {
      type: Number,
      required: true,
      trim: true
    },
    phone2: {
      type: Number,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
  },
  { _id: false } // evito di creare un _id per qesto sotto documento
);

// ----- Schema responsabile punto vendita
const ManagerSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: String,
    required: true,
    trim: true
  }
},
  { _id: false } // evito di creare un _id per qesto sotto documento
);

// ----- schema dei punti vendita 
const StoreSchema = new mongoose.Schema(
  {
    storeCode: {
      type: String,
      required: true,
      trim: true
    },
    Name: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['Attivo', 'Inattivo', 'Temporaneamente Chiuso'],
      default: 'Attivo'
    },

    openingHours: [OpeningHoursSchema],
    andress: [AddressSchema],
    contacts: [ContactsSchema],
    manager: [ManagerSchema],

    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
    collection: "pdv",
  }
);

// ----- Confronto password
StoreSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// -----Middleware hashing password prima di salvataggio 
StoreSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Store", StoreSchema);