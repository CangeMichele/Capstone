function srcProducts(srcParams, thisBrand) {
    const { radioParams } = srcParams;
  
     switch (Object.keys(radioParams)[0]) {
       case "brand":
          //Azione specifica per il caso "brand"
         console.log(`Searching by brand`);
         console.log(radioParams);
         return radioParams.brand;

       case "global":
          //Azione specifica per il caso "brand"
         console.log(`Searching global`);
         console.log(radioParams);
         return radioParams.brand;
  
       case "ean":
          //Azione specifica per il caso "ean"
         console.log(`Searching EAN`);
         console.log(radioParams);
         if(radioParams === "notValid") {return null} else return radioParams;
  
       case "product_id":
          //Azione specifica per il caso "product_id"
          console.log(`Searching product_Id:`);
         console.log(radioParams);
         if(radioParams === "notValid") {return null} else return radioParams;
  
       default:
          //Azione di default nel caso non ci sia una chiave riconosciuta
         console.log("No valid search parameter found.");
         return null;
     }
  }
  
  export default srcProducts;
  