// ----- React -----
import { BrowserRouter, Routes, Route } from "react-router-dom";
// ----- Stilizzazione -----
import "./App.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// ----- Componenti -----
import MyFooter from "./components/footer/MyFooter";
import MyNavbar from "./components/navbar/MyNavbar";
// ----- Pagine -----
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ErrorPage from "./pages/errorPage/ErrorPage";
import ProductsPage from "./pages/products/ProductsPage";
import ProductDetails from "./pages/products/ProductDetails";
import Customers from "./pages/customers/CustomersPage";
import CashRegister from "./pages/cashRegister/CashRegister";
import BrandDetailsPage from "./pages/brands/BrandDetailsPage";
import BrandsPage from "./pages/brands/BrandsPage"


function App() {
  
  return (
    <>
      <BrowserRouter>
        <MyNavbar />

        <Container className="container-app mt-5">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/casher" element={<CashRegister />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/details/:product_id" element={<ProductDetails />} />
            <Route path="/casher" element={<CashRegister />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/brands/details" element={<BrandDetailsPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Container>

        <MyFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
