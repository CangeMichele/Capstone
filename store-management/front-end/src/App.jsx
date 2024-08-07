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

import TestPage from "./pages/test-page/TestPage";

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
            <Route path="/test-page" element={<TestPage />} />
            <Route path="/userlogin" element={<UserLogin />} />
          </Routes>
        </Container>

        <MyFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
