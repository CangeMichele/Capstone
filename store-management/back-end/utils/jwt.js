import jwt from "jsonwebtoken";

// -----Generazione token JWT
export const generateJWT = (payload) => {
  
  return new Promise((resolve, reject) =>
  
    jwt.sign(
      payload,
      process.env.JWT_SECRET, 
      { expiresIn: "6h" }, // il login rimane attivo 6 ore, circa un turno di lavoro
      (err, token) => {
        if (err) reject(err); 
        else resolve(token); 
      }
    )
  );
};

// ----- Verifica token JWT
export const verifyJWT = (token) => {
  
  return new Promise((resolve, reject) =>
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded); 
    })
  );
};