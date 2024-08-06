import express from "express";

// ----- modelli
import User from "../models/User.js";


const router = express.Router();


// -----POST/ -> nuovo utente
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);

    const newUser = await user.save();

    const userResponse = newUser.toObject();
    delete userResponse.password; // Rimuovo la password dalla risposta per sicurezza

    res.status(201).json(userResponse);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ----- GET/ -> tutti gli utenti
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    if(!user){
      res.json({message: "nessun utente registrato"})
    }
    res.json(user);

  } catch (err) {
  }
});

// ----- GET/ -> utente specifico
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