import express from "express";

// ----- modelli
import Store from "../models/Store.js";

const router = express.Router();

// ----- POST -> creazione nuovo punto vendita
router.post("/", async (req, res) => {
  try {
    const store = new Store(req.body);
    
    const newStore = await store.save();
    
    const StoreResponse = newStore.toObject();
    delete StoreResponse.password;  // Rimuovo la password dalla risposta per sicurezza
    
    res.status(201).json(StoreResponse);
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// ----- GET -> tutti i punti vendita
router.get("/", async (req, res) => {
  try {
    const store = await Store.find();
    res.json(store);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ----- GET -> punto vendita specifico
router.get("/:id", async (req, res) => {
  try {
    const user = await Store.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

 // ----- PATCH -> punto vendita
 router.patch("/:id", async(req, res) =>{
  // ricerca per id e carica modifiche
  try {
    const updateStore = await Store.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updateStore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

  // ----- DELETE -> Elimina punto vendita
  router.delete("/:id", async(req, res)=>{
    
    try {
      const toDeleteStore = await Store.findByIdAndDelete(req.params.id) 
      return toDeleteStore.data;

    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })


export default router;