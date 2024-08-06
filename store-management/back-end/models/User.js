import mongoose from "mongoose";
import bcrypt from "bcrypt";

// ----- Schema indirizzo
const AddressSchema = new  mongoose.Schema({
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
});

// ----- Schema contatti 
const ContactsSchema = new  mongoose.Schema(
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
    andress: [AddressSchema],
  });

// ----- Schema dipendenti punto vendita
const userSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
    collection: "user",
  }
);

// ----- Contronto password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// -----Middleware hashing password prima di salvataggio 
userSchema.pre("save", async function (next) {
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