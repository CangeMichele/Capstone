import { verifyJWT } from "../utils/jwt.js";
import User from "../models//User.js"

// Middleware autenticazione utente
export const authUserMiddleware = async (req, res, next) => {
  try {

    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send("Token mancante");
    }

    //verifico e decodifico il token
    const decoded = await verifyJWT(token);

    //estrapolo i dati  User escludendo la password
    const user = await User.findOne(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).send("Utente non trovato");
    }

    //assegno a req i dati dell'utente e li rendo disponibili a rotte successive
    req.user = user;
    
    next();

  } catch (error) {
    
    res.status(401).send("Token non valido");
  }
};