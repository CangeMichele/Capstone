import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
}, { _id: false }); // evito di creare un _id per qesto sotto documento

// ----- Schema contatti 
const ContactsSchema = new mongoose.Schema({
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
  address: [AddressSchema],
}, { _id: false }); // evito di creare un _id per qesto sotto documento

// ----- Schema dipendenti punto vendita
const userSchema = new mongoose.Schema({
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
  birthDate: { 
    type: Date, 
    required: true 
  },
  userId: {
    type: Number,
    unique: true
  },
  hiredDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  storeCode: {
    type: String,
    trim: true
  },
  position: {
    type: Number,
    enum: [1, 2, 3],
    //1: responsabile - 2: vice responsabile - 3:adetto vendite
    required: true,
    default: 3
  },
  contacts: [ContactsSchema],
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  collection: "user",
});

// ----- Confronto password fornita con password hashata
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ----- Middleware elaborazione prima del salvataggio 
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    while (true) {

      // Generazione newId di 5 cifre
      const newId = Math.floor(10000 + Math.random() * 90000);

      // verifico unicità newId e lo assegno a brand_id
      const existingUser = await this.constructor.findOne({ userId: newId });
      if (!existingUser) {
        this.userId = newId;
        break;
      }

    }
  }

  // Hashing password
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("User", userSchema);
