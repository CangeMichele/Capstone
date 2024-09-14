// ----- React -----
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';

export const isLogUser = () => {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    // TO DO VERIFICARE CHE IL TOKEN SIA DELL'UTENTE
    return !!token;
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login"); // Reindirizza alla pagina di login se non è loggato
    }
  }, [navigate]);

  return isLoggedIn();
};


