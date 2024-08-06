import { verifyJWT } from "../utils/jwt.js";
import Store from "../models/Store.js";

// Middleware autenticazione punto vendita
export const authStoreMiddleware = async (req, res, next) => {
  try {

    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send("Token mancante");
    }

    //verifico e decodifico il token
    const decoded = await verifyJWT(token);

    //estrapolo i dati del punto vendita escludendo la password
    const store = await Store.findOne(decoded.pdvCode).select("-password");

    if (!store) {
      return res.status(401).send("Punto di Vendita non trovato");
    }

    //assegno a req i dati del punto vendita e li rendo disponibili a rotte successive
    req.store = store;
    
    next();

  } catch (error) {
    
    res.status(401).send("Token non valido");
  }
};