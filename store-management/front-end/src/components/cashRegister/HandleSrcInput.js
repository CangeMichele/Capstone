// ----- API -----
import { getSrcCustomers } from "../../services/apiCustomer"
import { getProductByProduct_id, getProductByEan } from "../../services/apiProducts"

export default async function HandleSrcInput(inputProd, setFidelity, setModalTitle, setModalMessage, handleShow) {

  const {quantity, reference} = inputProd;  

  switch (reference.length) {
    case 6:
      try {
        const response = await getProductByProduct_id(reference)
        const newPrdoItem = {
          quantity: quantity,
          name:response.products[0].name,
          prod_id: response.products[0].product_id,
          price: response.products[0].price
        }
                
        return newPrdoItem ;

      } catch (error) {
        setModalTitle("Articolo inesitente")
        setModalMessage(`nessun riferimento associato a ${reference}`)
        handleShow();
      }
      break;

    case 10:
      try {
        const response = await getSrcCustomers({ cardCode: reference })
        const strFidelity = `${response[0].cardCode}   -   ${response[0].lastName} ${response[0].firstName}`
        setFidelity(strFidelity)
        return response[0].cardCode;

      } catch (error) {
        setModalTitle("Articolo inesitente")
        setModalMessage(`nessun riferimento associato a ${reference}`)
        handleShow();
      }
      break;

    case 13:
      try {
        const response = await getProductByEan(reference)
        const newPrdoItem = {
          quantity: quantity,
          name:response.products[0].name,
          prod_id: response.products[0].product_id,
          price: response.products[0].price
        }
        return newPrdoItem ;
      } catch (error) {
        setModalTitle("Articolo inesitente")
        setModalMessage(`nessun riferimento associato a ${reference}`)
        handleShow();
      }
      break;


    default:
      console.log("errore");

      setModalTitle("Articolo inesitente")
      setModalMessage(`nessun riferimento associato a ${reference}`)
      handleShow();
      return false
  }


}


