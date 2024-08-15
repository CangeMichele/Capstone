import express from "express";
// ----- Models
import Product from "../models/Product.js";

const router = express.Router();

// -----POST/ -> nuovo prodotto
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);

    const newProduct= await product.save();

    const productResponse = newProduct.toObject();
    res.status(201).json(productResponse);

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


export default router;


/////// DELETE BRAND E REINSERIRE