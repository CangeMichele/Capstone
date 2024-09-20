import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import  {isLogUser}  from "../../functions/isLogUser.js";

function MyNavbar() {
  
  const isLoggedIn = isLogUser();
  // ----- gestore Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("store");
    localStorage.removeItem("thisBrand");
    navigate("/");
  };

  const store = JSON.parse(localStorage.getItem("store"));


  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        {/* Sinistra: Logo PetStore */}
        <Navbar.Brand className="me-auto">
          <b>PetStore</b>
        </Navbar.Brand>

        {/* Centro: Nome e Codice Negozio */}
        <Container className="d-flex justify-content-center">
          <Navbar.Text>
            {store && <span>{store.Name} - {store.storeCode}</span>}
          </Navbar.Text>
        </Container>

        {/* Destra: Links di navigazione */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn && (
              <>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/casher" className="d-none d-lg-block">
                  <Nav.Link>Cassa</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/products">
                  <Nav.Link>Articoli</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/customers">
                  <Nav.Link>Clienti</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/userlogin">
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
