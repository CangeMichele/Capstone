function srcProducts(srcParams, thisBrand) {
    const { radioParams } = srcParams;
  
     switch (Object.keys(radioParams)[0]) {
       case "brand":
          //Azione specifica per il caso "brand"
         console.log(`Searching by brand: ${radioParams.brand}`);
         return radioParams.brand;

       case "global":
          //Azione specifica per il caso "brand"
         console.log(`Searching global`);
         return radioParams.brand;
  
       case "ean":
          //Azione specifica per il caso "ean"
         console.log(`Searching by EAN: ${radioParams.ean}`);
         return radioParams.ean;
  
       case "product_id":
          //Azione specifica per il caso "product_id"
         console.log(`Searching by product ID: ${radioParams.product_id}`);
         return radioParams.product_id;
  
       default:
          //Azione di default nel caso non ci sia una chiave riconosciuta
         console.log("No valid search parameter found.");
         return null;
     }
  }
  
  export default srcProducts;
  