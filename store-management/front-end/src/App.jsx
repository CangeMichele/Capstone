// ----- css & bootstrap
import "./App.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// ----- components
import MyFooter from "./components/footer/MyFooter";
import MyNavbar from "./components/navbar/MyNavbar";

// ----- pages
import Home from "./pages/home/Home";
import UserLogin from "./pages/UserLogin/UserLogin";
import ErrorPage from "./pages/errorPage/ErrorPage";

// ----- react
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <MyNavbar />

        <Container className="container-app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userlogin" element={<UserLogin />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Container>

        <MyFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
