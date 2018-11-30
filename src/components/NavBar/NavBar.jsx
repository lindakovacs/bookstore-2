import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

function NavBar (props) {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href='/'>Bookstore</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <NavItem eventKey={1} href='/bookshelf'>
                    My Bookshelf
                </NavItem>
        <NavItem eventKey={2} href='/search'>
                    Search
                </NavItem>
      </Nav>
    </Navbar>
  )
}

export default NavBar
