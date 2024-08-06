import express from "express";

// ----- modelli
import Store from "../models/Store.js";

const router = express.Router();

// ----- Creazione nuovo punto vendita
router.post("/", async (req, res) => {
  try {
    const store = new Store(req.body);
    
    const newStore = await store.save();
    
    const StoreResponse = newPdV.toObject();
    delete StoreResponse.password;  // Rimuovo la password dalla risposta per sicurezza
    
    res.status(201).json(StoreResponse);
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// ----- Tutti i punti vendita
router.get("/", async (req, res) => {
  try {
    const store = await Store.find();
    res.json(store);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ----- Punto  specifico
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;