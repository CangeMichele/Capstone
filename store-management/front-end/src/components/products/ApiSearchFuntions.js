import { getBrandProductsPage } from "../../services/apiBrand";


// **** Prodotti per brand e ricerca 
export const apiSrcInBrand = async (brand, srcParams, pagination) => {


    //array parametri chiamata api
    let apiParams = [brand, pagination.currentPage, pagination.limit];

    // Se campo testo non vuoto aggiungo parametri ricerca
    if (srcParams.filter_value.srcText !== "") {
        apiParams = [...apiParams,
        srcParams.filter_value.srcText,
        srcParams.filter_value.in_name,
        srcParams.filter_value.in_description]
    }

    //array risultato ricerca 
    let result = []

    try {
        const response = await getBrandProductsPage(...apiParams);
        result = response;
    } catch (error) {
        console.error("Errore nella richiesta per brand:", error);
        throw error;
    }

    console.log("risultato", result);
    return result;
};



// **** Ricerca globale
export const apiSrcInGlobal = async (srcParams, pagination) => {
    //array risultato ricerca 
    let result = []

    //array parametri chiamata api
    let apiParams = [pagination.currentPage, pagination.limit];

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

export const apiSrcByEan = async (srcParams, pagination) => {
    // Implementazione della ricerca per EAN
};

export const apiSrcByProductId = async (srcParams, pagination) => {
    // Implementazione della ricerca per Product ID
};
