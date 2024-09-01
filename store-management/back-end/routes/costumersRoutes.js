import express from "express";
// ----- Modelli ----
import Costumer from "../models/Costumer.js";

const router = express.Router();


// -----POST/ -> nuovo Costumer
router.post("/", async (req, res) => {
    try {
      const costumer = new Costumer(req.body);
  
      const newCostumer= await costumer.save();
  
      const response = newCostumer.toObject();
      res.status(201).json(response);
  
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


  // -----GET -> tutti i brand
router.get("/", async (req, res) => {
    try {
      const costumer = await Costumer.find();
      res.json(costumer);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
export default router;
