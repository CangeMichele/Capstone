import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import { isLogUser } from "../../function/isLogUser";
import { getUserData } from "../../services/api.js";
const Home = () => {
  // ---- funzione che controlla se utente loggato, se no rimanda al login
  isLogUser();

  // ----- recupero dati utente loggato
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error("Errore nel recupero dei dati utente:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <>
      <h1>QUESTA E' LA HOME </h1>
      <h3>Benvenuto {user.firstName}</h3>
    </>
  );
};

export default Home;
