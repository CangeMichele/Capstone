import express from "express";
import { generateJWT } from "../utils/jwt.js";
// ----- auth middleware
import { authStoreMiddleware } from "../middlewares/authStoreMiddleware.js";
import { authUserMiddleware } from "../middlewares/authUserMiddleware.js";
// ----- modelli
import User from "../models/User.js";
import Store from "../models/Store.js";

const router = express.Router();

// ---- Autenticazione utente (recupero token di accesso)
router.post("/user", async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await User.findOne({userId});
    if (!user) {
      return res.status(401).json({ message: "Utente non trovato" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password errata" });
    }

    const token = await generateJWT({ userId: userId });
    res.json({ token, message: "Login effettuato con successo" });

  } catch (error) {
    console.error("Errore nel login:", error);
    res.status(500).json({ message: "Errore del server" });
  }
});

// ----- Recuper dati del utente
router.get("/user", authUserMiddleware, (req, res) => {

  const authorData = req.user.toObject();
  delete authorData.password;  // Rimuove il campo password per sicurezza

  res.json(authorData);
});




// ---- Autenticazione store (recupero token di accesso)
router.post("/store", async (req, res) => {
  try {
    const { storeCode, password } = req.body;

    const store = await Store.findOne({ storeCode });
    if (!store) {
      return res.status(401).json({ message: "punto vendita non valido" });
    }

    const isMatch = await store.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password non valide" });
    }

    const token = await generateJWT({ storeCodice: store.storeCode });
    res.json({ token, message: "Login effettuato con successo" });

  } catch (error) {
    console.error("Errore nel login:", error);
    res.status(500).json({ message: "Errore del server" });
  }
});

// ----- Recupero dati del store
router.get("/store", authStoreMiddleware, (req, res) => {

  const storeData = req.store.toObject();
  delete storeData.password;  // Rimuove il campo password per sicurezza

  res.json(storeData);

});

export default router;