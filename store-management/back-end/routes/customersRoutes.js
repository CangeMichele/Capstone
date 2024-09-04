import express from "express";
// ----- Modelli ----
import Customer from "../models/Customer.js";

const router = express.Router();


// -----POST/ -> nuovo cliente
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


  // -----GET -> estrapolazione clienti
router.get("/", async (req, res) => {

  
  
  try {
    // Estrapola dati dalla richiesta
    const { firstName, lastName, taxCode } = req.query;
    const query = {};
    
    // Verifica parametri e popola la query
    if (firstName) query.firstName = firstName;
    if (lastName) query.lastName = lastName;
    if (taxCode) query.taxCode = taxCode;
    
    const customer = await Customer.find(query);
    res.json(customer);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



export default router;
