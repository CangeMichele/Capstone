// ----- React -----
import React, { useEffect, useState } from "react";
// ----- API -----
import { getProductsBrand } from "../../services/api";
// ----- stilizzazione -----
import { Table } from "react-bootstrap";

function ProductsList({ brand }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsBrand = async () => {
      try {
        const productsBrandData = await getProductsBrand(brand.name);
        setProducts(productsBrandData);
      } catch (error) {
        console.error("Errore nel recupero dei prodotti", error);
      }
    };

    fetchProductsBrand();
  }, [brand]);
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Product ID</th>
            <th>Category</th>
            <th>EAN</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Stock Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.product_id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.product_id}</td>
              <td>{product.category}</td>
              <td>{product.ean}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.stockQuantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
export default ProductsList;
