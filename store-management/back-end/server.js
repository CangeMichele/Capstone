
import express from "express"; 
import mongoose from "mongoose"; 
import dotenv from "dotenv"; 
import cors from "cors"; 
import listEndpoints from "express-list-endpoints"; 
// ----- rotte
import authRoutes from "./routes/authRoutes.js";
import storesRoutes from "./routes/storesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import costumersRoutes from "./routes/costumersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
// ----- middleware
import {
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./middlewares/errorHandlers.js";



dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());


// Connessione MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connesso"))
  .catch((err) => console.error("Errore nella connessione MongoDB:", err));


// Definizione endpoint rotte
app.use("/api/auth", authRoutes); 
app.use("/api/stores", storesRoutes); 
app.use("/api/users", usersRoutes); 
app.use("/api/costumers", costumersRoutes);
app.use("/api/products", productsRoutes);

// Definizione porta Server
const PORT = process.env.PORT || 3001;

// Applicazione dei middleware per la gestione degli errori
app.use(badRequestHandler); 
app.use(unauthorizedHandler); 
app.use(notFoundHandler); 
app.use(genericErrorHandler);

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);

  // Stampa tutte le rotte disponibili in formato tabellare
  console.log("Rotte disponibili:");
  console.table(
    listEndpoints(app).map((route) => ({
      path: route.path,
      methods: route.methods.join(", "),
    }))
  );
});