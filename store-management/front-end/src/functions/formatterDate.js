// Funzione per convertire una data ISO in gg/mm/aaaa

export const formatterDate = (isoDate, format) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
   
    if(format === "yyyy-MM-dd"){
        return `${year}-${month}-${day}`;
    }
   
};