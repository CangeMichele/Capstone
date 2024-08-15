import mongoose from "mongoose";

// ----- Schema supplier 
const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    contactPerson: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    orderMethods: {
        type: [
            {
                method: {
                    type: String,
                    enum: ['online', 'phone', 'email', 'fax', 'in-person'], // Metodi di ordine supportati
                    required: true
                },
                details: {
                    type: String,
                    trim: true
                }
            }
        ],
        default: []
    },
    orderDays: {
        type: [String],
        enum: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
    },
    deliveryDays: {
        type: [String], // Giorni della settimana in cui sono effettuate le consegne
        enum: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
    }
});

// ----- Schema brand
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    logoUrl: {
        type: String,
        trim: true
    },
    supplier: {
        type: supplierSchema,
        required: true
    },
    brand_id: {
        type: String
    }
});

// ----- Middleware elaborazione prima del salvataggio 
brandSchema.pre("save", async function (next) {
    if (this.isNew) {
        while (true) {

            // Generazione newId di 2 cifre
            const newId = Math.floor(10 + Math.random() * 90);

            // verifico unicità newId e lo assegno a brand_id
            const existingBrand = await this.constructor.findOne({ brand_id: newId });
            if (!existingBrand) {
                this.brand_id = newId;
                break;
            }

        }
    }

    next(); // Aggiungi next() qui per continuare il salvataggio

});




export default mongoose.model("Brand", brandSchema);