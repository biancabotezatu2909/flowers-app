import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TopHoverNavbar.css';

function TopHoverNavbar() {
    return (
        <div>
            <div className="hover-trigger"></div>
            <Navbar className="hover-navbar">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/add-flower" className='addFlowerText'>Add a new flower</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
}

export default TopHoverNavbar;
