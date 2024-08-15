// ----- css & bootstrap
import "./App.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// ----- components
import MyFooter from "./components/footer/MyFooter";
import MyNavbar from "./components/navbar/MyNavbar";

// ----- pages
import Home from "./pages/home/Home";
import UserLogin from "./pages/userLogin/UserLogin";
import ErrorPage from "./pages/errorPage/ErrorPage";
import CustomersMgmt from "./pages/customersMgmt/CustomersMgmt";
import Products from "./pages/products/Products";
import CashRegister from "./pages/cashRegister/CashRegister";

// ----- react
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  
  return (
    <>
      <BrowserRouter>
        <MyNavbar />

        <Container className="container-app">
          <Routes>
            <Route path="/userlogin" element={<UserLogin />} />
            <Route path="/" element={<Home />} />
            <Route path="/casher" element={<CashRegister />} />
            <Route path="/products" element={<Products />} />
            <Route path="/casher" element={<CashRegister />} />
            <Route path="/costumers" element={<CustomersMgmt />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Container>

        <MyFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
