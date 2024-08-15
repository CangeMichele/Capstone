import express from "express";
// ----- Models
import Brand from "../models/Brand.js";

const router = express.Router();

// -----POST/ -> nuovo brand
router.post("/", async (req, res) => {
    try {
      const brand = new Brand(req.body);
  
      const newBrand= await brand.save();
  
      const brandResponse = newBrand.toObject();
      res.status(201).json(brandResponse);
  
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// -----GET -> tutti i brand
router.get("/", async (req, res) => {
  try {
    const brand = await Brand.find();
    res.json(brand);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -----DELETE -> cancella brand
router.delete("/:id", async (req, res) => {
  try {
    const deleteBrand = await Brand.findOneAndDelete({ brand_id: req.params.id });
    if (!deleteBrand) {
      return res.status(404).json({ message: "Brand  non trovato" });
    }
    res.json({ message: "Brand eliminato" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
