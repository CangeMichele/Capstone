import express, { query } from "express";
// ----- Models
import Product from "../models/Product.js";

const router = express.Router();

// -----***** API sviluppo *****-----

// -----POST/ -> inserimento nuovo prodotto / array prodotti
router.post("/", async (req, res) => {
  try {
    //se non è un array crea un array con il singolo elemento
    const productsData = Array.isArray(req.body) ? req.body : [req.body];

    const savedProducts = [];
    //iters l'array aggioungendo un articolo alla volta per poter eseguire le operazioni di productsSchema
    for (const productData of productsData) {
      const product = new Product(productData);
      const newProduct = await product.save();
      savedProducts.push(newProduct);
    }

    res.status(201).json(savedProducts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// -----GET -> tutti i prodotti - DEBUG
/*router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

*/

// -----DELETE -> cancella articolo
router.delete("/prod_id/:id", async (req, res) => {
  try {
    const deleteProduct = await Product.findOneAndDelete({ product_id: req.params.id });
    if (!deleteProduct) {
      return res.status(404).json({ message: "Articolo non trovato" });
    }
    res.json({ message: "Articolo eliminato" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----- PATCH -> Modifica articolo
router.patch("/prod_id/:id", async (req, res) => {
  try {
    const updatePrduct = await Product.findOneAndUpdate({ product_id: req.params.id }, req.body, {
      new: true,
    });
    res.json(updatePrduct);
  } catch (error) {
    res.status(400).json({ message: error.message })

  }
})

// -----***** API form ricerca *****-----

// -----GET -> Ricerca su Brand con impaginazione e filtri
router.get("/brand/:brand", async (req, res) => {
  try {

    // Destrutturazione parametri query con asseganzioni se non definiti
    const {
      page = 1,
      limit = 10,
      sort = "product_id",
      sortDirection = 1,
      srcText,
      in_name,
      in_description
    } = req.query;

    const skip = (page - 1) * limit;

    let query = { brand: req.params.brand };

    // se c'è testo applica filtri
    if (srcText) {
      const queryParams = [];

      if (in_name === "true") {
        queryParams.push({ name: { $regex: srcText, $options: "i" } });
      }

      if (in_description === "true") {
        queryParams.push({ description: { $regex: srcText, $options: "i" } });
      }

      if (queryParams.length > 0) {
        query.$or = queryParams;
      }
    }

    const products = await Product.find(query)
      .sort({ [sort]: sortDirection })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    // Risposta con i dati dei prodotti e dettagli di paginazione
    res.json({
      products,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalProducts: total
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// -----GET -> ricerca Globale con impaginazione e filtri
router.get("/", async (req, res) => {
  try {

    // Destrutturazione parametri query con asseganzioni se non definiti
    const {
      page = 1,
      limit = 10,
      sort = "product_id",
      sortDirection = 1,
      srcText,
      in_name,
      in_description
    } = req.query;

    const skip = (page - 1) * limit;

    let query = {};

    // se c'è testo applica filtri
    if (srcText) {

      const queryParams = [];

      if (in_name === "true") {
        queryParams.push({ name: { $regex: srcText, $options: "i" } });
      }

      if (in_description === "true") {
        queryParams.push({ description: { $regex: srcText, $options: "i" } });
      }

      if (queryParams.length > 0) {
        query.$or = queryParams; // Combina le condizioni con $or
      }
    }

    const products = await Product.find(query)
      .sort({ [sort]: sortDirection })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    // Risposta con i dati dei prodotti e dettagli di paginazione
    res.json({
      products,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalProducts: total
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// -----GET -> Ricerca prodotto per EAN
router.get("/ean/:ean", async (req, res) => {
  try {
    const product = await Product.findOne({ ean: req.params.ean })
    if (!product) {
      return res.status(404).json({ message: "Articolo non trovato" })
    }
    res.json({ products: [product] });
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
});



// -----GET -> Ricerca prodotto per Product_id
router.get("/prod_id/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ product_id: req.params.id })
    if (!product) {
      return res.status(404).json({ message: "Articolo non trovato" })
    }

    res.json({ products: [product] });
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
});

export default router;
