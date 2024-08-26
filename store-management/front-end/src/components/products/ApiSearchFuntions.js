import { getProductsPage } from "../../services/api";




// **** Ricerca nel Brand
export const apiSrcInBrand = async (thisBrand, srcParams, pagination) => {

    //array risultato ricerca 
    let result = []

    //array parametri chiamata api
    let apiParams = [thisBrand.name, pagination.currentPage, pagination.limit];

    // Se campo testo non vuoto aggiungo parametri ricerca
    if (srcParams.filter_value.srcText !== "") {
        apiParams = [...apiParams,
        srcParams.filter_value.srcText,
        srcParams.filter_value.in_name,
        srcParams.filter_value.in_description]
    }

    try {
        const response = await getProductsPage(...apiParams);
        result = response;
    } catch (error) {
        console.error("Errore nella richiesta per brand:", error);
        throw error;
    }

    console.log("risultato", result);
    return result;
};

// Altri metodi per le ricerche global, ean, product_id
export const apiSrcInGlobal = async (srcParams, pagination) => {
    // Implementazione della ricerca globale
};

export const apiSrcByEan = async (srcParams, pagination) => {
    // Implementazione della ricerca per EAN
};

export const apiSrcByProductId = async (srcParams, pagination) => {
    // Implementazione della ricerca per Product ID
};
