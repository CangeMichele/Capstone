import mongoose from "mongoose";
// ----- Modelli
import Brand from "./Brand.js";


// ----- Schema prodotti
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    product_id: {
        type: String,
        unique: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Cani', 'Gatti', 'Uccelli', 'Pesci', 'Roditori', 'Altro'], // Categorie possibili
    },
    ean: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: String, // Peso, litri, numero pezzi
        required: true,
        min: 0
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500 // Limite di 500 caratteri per la descrizione
    },
    stockQuantity: {
        type: Number, // Quantità disponibile in magazzino
        required: true,
        min: 0
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true // Default è true, indicando che il prodotto è in assortimento
    },
    imageUrl: {
        type: String, // URL dell'immagine del prodotto
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


/// ----- Middleware elaborazione prima del salvataggio 
productSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {

            let brandId;
            // Incrocio 'brand' con 'name' di BrandSchema e ricavo brandId
            const brand = await Brand.findOne({ name: this.brand });
            if (brand) {
                brandId = brand.brand_id; // Assegno il valore
                
            } else {
                const error = new Error(`Errore nella ricerca del Brand: ${this.brand}.`);
                return next(error);
            }
            
            while (true) {
                // Generazione random di 3 cifre
                let ran3 = Math.floor(100 + Math.random() * 900);

                // Generazione productId come 0 + 2 cifre brand_id + 3 cifre articolo
                const productId = "0" + brandId + ran3;

                // Verifica unicità productId e lo assegna a product_id
                const existingProduct = await this.constructor.findOne({ product_id: productId });
                if (!existingProduct) {
                    this.product_id = productId;
                    break;

                }
            }

            next();
        } catch (err) {
            return next(err);
        }
    } else {
        next();
    }
});


export default mongoose.model("Product", productSchema);