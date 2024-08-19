import express from "express";
// ----- Models
import Product from "../models/Product.js";

const router = express.Router();



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



// -----GET -> tutti i prodotti
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -----DELETE -> cancella articolo
router.delete("/:id", async (req, res) => {
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


// -----GET -> prodotti per Brand  con impaginazione
router.get("/:brand", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "product_id";
    const sortDirection = req.query.sortDirection === 'desc' ? 1 : -1;
    const skip = (page-1)*limit;

    const productsBrand = await Product.find({ brand: req.params.brand })
    .sort({[sort]: sortDirection})
    .skip(skip)
    .limit(limit);
    
    const total = await  Product.countDocuments({ brand: req.params.brand });

    res.json({productsBrand,
      currentPage: page,
      totalPages: Math.ceil(total/limit),
      totalProducts: total
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
