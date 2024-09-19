// ----- API -----
import { patchProduct, getProductByProduct_id } from "../../services/apiProducts"

export default async function HandeleUpdateQuantityProd(prodList) {

    const updateList = prodList.reduce((accumulator, product) => {
        // Se product è una stringa (carta fedeltà), ignorala
        if (typeof product === 'string') {
            return accumulator;
        }

        // verifica se prod_id è già stato inserito
        const existingProduct = accumulator.find(p => p.prod_id === product.prod_id);

        if (existingProduct) {
            // se si , aggiungi quantità a quella già eistente
            existingProduct.totalQuantity += product.quantity;
        } else {
            // se no, inserisci e immetti quantità attuale
            accumulator.push({ prod_id: product.prod_id, totalQuantity: product.quantity });
        }

        return accumulator;
    }, []);

    // CICLO FOR-OF GESTISCE OPRAZIONI ASINCRONE
    for (const product of updateList) {
        let stockQuantity = 0;

        // ricerca quanità presente nel db 
        try {
            const response = await getProductByProduct_id(product.prod_id);
            console.log(response);
            stockQuantity = parseInt(response.products[0].stockQuantity, 10);
            console.log("stockQuantity", stockQuantity);

        } catch (error) {
            console.error(error)
        }

        //elabora differenza quantità
        const productQuantity = parseInt(product.totalQuantity, 10);
        console.log("productQuantity", productQuantity);
        
        let newQuantity = (stockQuantity - productQuantity);
        newQuantity = newQuantity < 0 ? 0 : newQuantity;
        console.log("newQuantity", newQuantity);
        

        //aggiorna DB con la quantità
       try {
            const response = await patchProduct(product.prod_id, {stockQuantity: newQuantity});
            console.log(response);
            
        } catch (error) {
            console.error(error)
        }
    };

    return updateList

}
