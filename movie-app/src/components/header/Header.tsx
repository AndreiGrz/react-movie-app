import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import './header.scss';
import { Link } from "react-router-dom";


const Header = () => {
    return <div className="header">
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="menu-items">
            <div className="left">
                <Link to="/" className="nav-link">
                    Home
                </Link>
                <Link to="/login" className="nav-link">
                    Login
                </Link>
                <Link to="/register" className="nav-link">
                    Register
                </Link>
            </div>
            <div className="right">
                <Link to="/profile" className="nav-link">Welcome, Guest</Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>;
};

export default Header