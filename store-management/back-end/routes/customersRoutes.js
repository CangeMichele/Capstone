// ----- Express -----
import express from "express";
// ----- Modelli ----
import Customer from "../models/Customer.js";

const router = express.Router();


// ----- POST/ -> nuovo cliente
router.post("/", async (req, res) => {
    try {
      const customer = new Customer(req.body);
  
      const newCustomer= await customer.save();
  
      const response = newCustomer.toObject();
      res.status(201).json(response);
  
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


  // ----- GET -> estrapolazione clienti
router.get("/", async (req, res) => {  
  try {
    // Estrapola dati dalla richiesta
    const { firstName, lastName, taxCode, cardCode  } = req.query;
    const myQuery = {};
    
   // Verifica parametri e popola la query case-insensitive
   if (firstName) myQuery.firstName = { $regex: new RegExp(firstName, 'i') };
   if (lastName) myQuery.lastName = { $regex: new RegExp(lastName, 'i') };
   if (taxCode) myQuery.taxCode = { $regex: new RegExp(taxCode, 'i') };
   if (cardCode) myQuery.cardCode = cardCode;

    
    const customer = await Customer.find(myQuery);
    res.json(customer);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



  // ----- PATCH -> Modifica cliente
  router.patch("/:id", async(req, res) =>{
    // ricerca per id e carica modifiche
    try {
      const updateCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(updateCustomer);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })


  // ----- DELETE -> Elimina cliente
  router.delete("/:id", async(req, res)=>{
    
    try {
      const toDeleteCustomer = await Customer.findByIdAndDelete(req.params.id) 
      return toDeleteCustomer.data;
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })

// ----- GET -> estrapolazione cliente tramite id
router.get("/:id", async (req, res) => {  
  try {
    const customer = await Customer.find(req.params.id);
    res.json(customer);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

export default router;
