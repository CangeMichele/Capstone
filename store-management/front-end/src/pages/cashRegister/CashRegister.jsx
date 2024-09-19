// ----- React -----
import React, { useEffect, useState, useRef } from "react";
// ----- React-router-dom -----
import { useNavigate } from "react-router-dom";
// ----- Stilizzazione -----
import {
  Button,
  Row,
  Col,
  Form,
  ListGroup,
  InputGroup,
  Modal,
} from "react-bootstrap";
import "./CashRegister.css";
import { FaArrowLeft } from "react-icons/fa";
// ----- Componenti
import HandleSrcInput from "../../components/cashRegister/HandleSrcInput";
import HandeleUpdateQuantityProd from "../../components/cashRegister/HandeleUpdateQuantityProd";
// ----- Funzioni
import { isLogUser } from "../../functions/isLogUser";

const CashRegister = () => {
  // Funzione controllo loging
  isLogUser();

  // Navigazione
  const navigate = useNavigate();

  // Stato prodotto da inserire
  const [inputProd, setInputProd] = useState({ quantity: "", reference: "" });
  // Stato visualizzazione in input
  const [inputString, setInputString] = useState("");

  // Stato per visualizzare prezzo precedente
  const [oldPrices, setOldPrices] = useState([]);
  // Stato per visualizzare quantità precedente
  const [oldQuantities, setOldQuantities] = useState([]);
  // Stato per visualizzare il totale
  const [totalShop, setTotalShop] = useState(0);

  // Stato lista prodotti
  const [prodList, setProdList] = useState([]);

  // Stato oggetto contenente elemento selezionato
  const [selectedProd, setSelectedProd] = useState({
    index: "",
    dataProd: "",
  });

  //Stato carta fedetà
  const [fidelity, setFidelity] = useState("");

  // Stato per switchare al momento del totale
  const [switchToal, setSwitchTotal] = useState(false);
  // Stato contenente valore inputPay
  const [inputPay, setInputPay] = useState(0);

  // Stato fine pagamento
  const [endPayment, setEndPayment] = useState(true)

  // Stato meggaggio per modale
  const [modalMessage, setModalMessage] = useState("");
  // Stato titolo del modale
  const [modalTitle, setModalTitle] = useState("");
  // Stato visualizza modale
  const [showModal, setShowModal] = useState(false);
  
  // callback chiudi modale
  const handleClose = async() => {
    setShowModal(false)
    if(endPayment === false){
      try {
        const response = await HandeleUpdateQuantityProd(prodList); 
        console.log("response update: ", response);
        

      } catch (error) {
        console.log("errore update",error );
        
      }


      handleDeleteReceipt();
      setEndPayment(true);
    }
  };
  // callback mostra modale
  const handleShow = () => setShowModal(true);

  // Riferimento al contenitore della lista
  const listContainerRef = useRef(null);

  // Riferimento all'input
  const inputRef = useRef(null);
  // Riferimento al pagamento
  const payRef = useRef(null);

  //Ogni volta che si aggiorna la lista o switchTotal torna false
  useEffect(() => {
    if (!switchToal) {
      //scrolla per vedere ultimo elemento
      if (listContainerRef.current) {
        listContainerRef.current.scrollTop =
          listContainerRef.current.scrollHeight;
      }
      // focus su input
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }

      // seleziona ultimo elemento
      setSelectedProd({
        index: prodList.length - 1,
        dataProd: prodList[prodList.length - 1],
      });

      // Aggiorna totale
      setTotalShop(handleCalculateTotal());

      // se switchato a modullo pagamento, focus su payRef
    } else {
      if (payRef.current) {
        payRef.current.focus();
        payRef.current.select();
      }
    }
  }, [prodList, switchToal]);

  //verifica input nel db
  async function controlInput() {
    try {
      const result = await HandleSrcInput(
        inputProd,
        setFidelity,
        setModalTitle,
        setModalMessage,
        handleShow
      );

      return result;
    } catch (error) {
      setModalTitle("ERRORE SERVER");
      setModalMessage(`se il problema persiste contattare assistenza.`);
      handleShow();
    }
  }

  //Gestore cambaimento input
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.includes("X")) {
      const [quantityPart, codePart] = inputValue.split("X");
      const quantity = parseInt(quantityPart.trim(), 10); // la parte prima di x rappresenta la quantità
      const reference = codePart ? codePart.trim() : ""; // la parte dopo x rappresenta il riferimento (codice/EAN)

      // Verifica che i numeri prima e dopo "X" siano numerici
      let isValidQuantity = /^[0-9]*$/.test(quantity);
      let isValidReference = /^[0-9]*$/.test(reference);
      if (isValidQuantity && isValidReference) {
        setInputProd({ quantity: quantity, reference: reference });
        setInputString(inputValue);
      }
    } else if (/^[0-9]*$/.test(inputValue)) {
      setInputProd({ quantity: 1, reference: inputValue });
      setInputString(inputValue);
    }
  };

  // Gestore funzioni tasti
  const handleKeyDown = async (event) => {
    /*  TASTO INVIO */
    if (event.key === "Enter") {
      //previene comportamento a capo tasto invio
      event.preventDefault();

      if (inputProd.reference.trim()) {
        const result = await controlInput();

        if (result) {
          const newProdItem = result;
          setProdList((prev) => {
            const updatedList = [...prev, newProdItem]; // aggiunge nuovo elemento alla lista
            return updatedList;
          });
        }
        // resetta input
        setInputProd({ quantity: "", reference: "" });
        setInputString("");
      }

      /* TASTO ASTERISCO */
    } else if (event.key === "*") {
      event.preventDefault();
      handleMultiply();

      /* TASTO FRECCIA SU */
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (prodList.length > 0 && selectedProd.index !== 0) {
        setSelectedProd({
          index: selectedProd.index - 1,
          dataProd: prodList[selectedProd.index - 1],
        });
      }

      /* TASTO FRECCIA GIU */
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (prodList.length > 0 && selectedProd.index !== prodList.length - 1) {
        setSelectedProd({
          index: selectedProd.index + 1,
          dataProd: prodList[selectedProd.index + 1],
        });
      }
      /* TASTO CANC */
    } else if (event.key === "Delete") {
      event.preventDefault();
      handleDeleteElement();
    }
  };

  //Gestore moltiplicatore
  const handleMultiply = () => {
    // se input vuoto
    if (!inputString.trim()) {
      const lastProd = prodList[prodList.length - 1];

      //copia ultimo se non è una stringa e se quanità è 1
      if (typeof lastProd !== "string" && lastProd.quantity == 1) {
        setProdList((prev) => [...prev, lastProd]);
        setSelectedProd({ index: prodList.length, dataProd: lastProd });
      }
    } else {
      if (inputString <= 100)
        if (!inputString.includes("X")) {
          //100 è massimo moltiplicatore
          setInputString(inputString + " X ");
        }
    }
  };

  // Gestore cancellazione elemento della lista (imposta a 0 quantità e lascia visibile)
  const handleDeleteElement = () => {
    if (typeof selectedProd.dataProd !== "string") {
      const updatedList = prodList.map((item, index) => {
        // Imposta la quantità a 0 per l'elemento selezionato
        if (index === selectedProd.index) {
          // Aggiorna gli array oldPrices e oldQuantities con lo setsso indice di index
          setOldPrices((prev) => {
            const newPrices = [...prev];
            newPrices[index] = (
              parseFloat(item.price) * parseInt(item.quantity, 10)
            ).toFixed(2);
            return newPrices;
          });
          setOldQuantities((prev) => {
            const newQuantities = [...prev];
            newQuantities[index] = item.quantity;
            return newQuantities;
          });
          return { ...item, quantity: 0 };
        }
        return item;
      });
      // Aggiorna la lista e mantieni il prodotto selezionato
      setProdList(updatedList);
    }
  };

  //Gestore Corettore
  const handleCorrecter = () => {
    setInputProd({ quantity: "", reference: "" });
    setInputString("");
    setSwitchTotal(false);
  };

  //Gestore annullamento scontrino
  const handleDeleteReceipt = () => {
    setInputProd({ quantity: "", reference: "" });
    setInputString("");
    setProdList([]);
    setSelectedProd({ index: "", dataProd: "" });
    setFidelity("");
    setSwitchTotal(false);
  };

  // Gestore calcolo Totale
  const handleCalculateTotal = () => {
    const total = prodList.reduce((accumulator, item) => {
      if (typeof item !== "string" && item.price && item.quantity) {
        // Calcola il prezzo totale del prodotto
        const itemTotal = parseFloat(item.price) * parseInt(item.quantity, 10);
        return accumulator + itemTotal;
      }
      return accumulator; // se non ha requisiti non accumula
    }, 0);

    // Restituisce il totale formattato a 2 decimali
    return total.toFixed(2);
  };

  // Gestore visualzzazione totale
  const handleTotalView = () => {
    setSwitchTotal(true);
  };

  // Gestore input pagamento
  const handlePayment = (method) => {

    setEndPayment(false);//false = pagamento in corso

    if (method === "cash") {
      const rest = (totalShop - inputPay).toFixed(2);
      setModalTitle(`RESTO: € ${rest}`);
      setModalMessage(`Totale: € ${totalShop}. Resto: €${rest}.`);
    } else if (method === "card") {
      setModalTitle("Pagamento effettuato");
      setModalMessage("transazione eseguita con successo");
    }

    handleShow();
  };

  return (
    <>
      <Row className="align-items-center mb-3">
        <Col xl="2">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="mb-3"
          >
            <FaArrowLeft /> Indietro
          </Button>
        </Col>
        <Col>
          <h1 className="text-center">Cassa</h1>
        </Col>
      </Row>

      <Row>
        {/* --- LISTA --- */}
        <Col className="container-list mx-1" ref={listContainerRef}>
          <ListGroup variant="flush" as="ol" numbered>
            {prodList.map((val, key) => (
              <ListGroup.Item
                as="li"
                key={key}
                onClick={() =>
                  setSelectedProd({
                    index: key,
                    dataProd: val,
                  })
                }
                className={`
                  d-flex justify-content-between align-items-center 
                  ${selectedProd.index === key && !switchToal ? "selected" : ""}
                  ${val.quantity === 0 ? "empty" : ""}
                  `}
              >
                {typeof val === "string" ? (
                  <>
                    <span className="text-start w-100 item-list">
                      <strong>Carta fedeltà: </strong>
                      {val}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="me-2 item-list">
                      <strong>
                        {val.quantity === 0 ? oldQuantities[key] : val.quantity}{" "}
                        x
                      </strong>
                    </span>
                    <span
                      className="text-truncate"
                      style={{ maxWidth: "50%", overflow: "hidden" }}
                    >
                      {val.name}
                    </span>
                    <span className="mx-2">-</span>
                    <span className="me-2">{val.prod_id}</span>
                    <span className="mx-2">-</span>
                    <span className="text-end">
                      €{" "}
                      {val.quantity === 0
                        ? oldPrices[key]
                        : (
                            parseFloat(val.price) * parseInt(val.quantity, 10)
                          ).toFixed(2)}
                    </span>
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col xl="6">
          <Row>
            <Form>
              <Row>
                {/* --- FIDELITY CARD --- */}
                <Form.Control
                  type="text"
                  placeholder="Fidelitycard: "
                  disabled
                  value={fidelity ? fidelity : ""}
                  className="mb-2"
                  id="input"
                />

                {/* --- DETTAGLI PRODOTTO --- */}
                <Form.Control
                  type="text"
                  placeholder={
                    prodList.length < 1 ? "Dettagli prodotto" : "Carta fedeltà"
                  }
                  disabled={switchToal}
                  value={
                    selectedProd.dataProd &&
                    typeof selectedProd.dataProd !== "string" &&
                    selectedProd.dataProd.name &&
                    selectedProd.dataProd.price
                      ? selectedProd.dataProd.name +
                        " - € " +
                        selectedProd.dataProd.price +
                        " cad."
                      : ""
                  }
                />

                {/* --- INPUT --- */}
                <Form.Control
                  type="text"
                  placeholder="Ean o codice prodotto"
                  value={inputString ? inputString : ""}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown} // Gestore tasto invio
                  ref={inputRef}
                  className="mt-5 mb-2"
                  disabled={switchToal}
                />
              </Row>

              {/* --- PULSANTI --- */}
              <Row className="mb-4">
                <Col>
                  <Button
                    className="w-100"
                    onClick={handleDeleteElement}
                    disabled={switchToal}
                  >
                    Cancella
                  </Button>
                </Col>
                <Col>
                  <Button className="w-100" onClick={handleCorrecter}>
                    Correttore
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="w-100"
                    onClick={handleMultiply}
                    disabled={switchToal}
                  >
                    Moltiplica
                  </Button>
                </Col>
                <Col>
                  <Button className="w-100" onClick={handleTotalView}>
                    Totale
                  </Button>
                </Col>
              </Row>

              <Row>
                {/* --- TOTALE --- */}
                <Form.Control
                  type="text"
                  value={`TOTALE: € ${totalShop || "0.00"}`}
                  disabled
                  className={`mb-3 ${switchToal ? "total-on" : ""}`}
                />

                {/* --- INPUT PAGAMENTO --- */}
                <InputGroup className="mb-3">
                  <InputGroup.Text>pagamento</InputGroup.Text>
                  <Form.Control
                    type="text"
                    readOnly={!switchToal}
                    value={!switchToal ? "" : inputPay}
                    ref={payRef}
                    onChange={(e) => setInputPay(e.target.value)}
                  />
                </InputGroup>

                {/* --- CONTANTI --- */}
                <Col>
                  <Button
                    disabled={!switchToal}
                    onClick={() => handlePayment("cash")}
                    className="w-100"
                  >
                    Contanti
                  </Button>
                </Col>

                {/* --- CARTA --- */}
                <Col>
                  <Button
                    disabled={!switchToal}
                    onClick={() => handlePayment("card")}
                    className="w-100"
                  >
                    Carta
                  </Button>
                </Col>

                {/* --- ANNULLA SCONTRINO --- */}
                <Col>
                  <Button onClick={handleDeleteReceipt}>
                    Annulla scontrino
                  </Button>
                </Col>
              </Row>
            </Form>
          </Row>
        </Col>
      </Row>

      {/* --- MODALE ERRORE INPUT --- */}
      <Modal show={showModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CashRegister;
