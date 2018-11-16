import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";

function NavBar(props) {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <NavLink to="/">
                        Bookstore
                    </NavLink>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
                <NavItem>
                    <NavLink to="/bookshelf">
                        My Bookshelf
                    </NavLink>            
                </NavItem>
                <NavItem>
                    <NavLink to="/search">
                        Search
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
}

export default NavBar;
