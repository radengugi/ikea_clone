import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, InputGroup, Input, Button, InputGroupAddon } from 'reactstrap';

// functional component
const NavbarComp = (props) => {
    // penulisan state pada functional component
    let [buka, setBuka] = useState(false)

    const toggle = () => {
        setBuka(!buka)
    }

    return (
        <div className="container-fluid">
            <div>
                <ul type="none" className="d-flex m-2" style={{ justifyContent: 'space-between', color: 'blue' }}>
                    <li>Indonesia</li>
                    <li><a>Bahasa</a></li>
                    <li><a>Informasi Toko</a></li>
                    <li><a>Kebijakan Pengembalian</a></li>
                    <li><a>IKEA Bisnis</a></li>
                    <li><a>Lacak Pengiriman</a></li>
                    <li><a>Katalog dan Brosur</a></li>
                    <li><a>Program Perencanaan</a></li>
                    <li><Link to="/login"><a>Masuk atau Daftar</a></Link></li>
                </ul>
            </div>
            <Navbar expand="md" style={{ backgroundColor: '#FFFFFF' }}>
                <NavbarBrand><img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/logos/IKEA_logo.svg"
                    width="100px" /></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={buka} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/" style={{ color: 'gray' }}>Products</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret style={{ color: 'gray', fontWeight: 'bolder' }}>
                                Category
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                            </DropdownItem>
                                <DropdownItem>
                                    Option 2
                            </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <NavLink href="/components/" style={{ color: 'gray' }}>Inspirasi</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/components/" style={{ color: 'gray' }}>Harga lebih rendah</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/components/" style={{ color: 'gray' }}>Last chance!</NavLink>
                        </NavItem>
                    </Nav>
                    <InputGroup size="sm" style={{ width: '20%' }}>
                        <Input placeholder="Cari..." />
                        <InputGroupAddon addonType="append">
                            <span className="btn btn-outline-secondary material-icons">
                                search
                            </span>
                        </InputGroupAddon>
                    </InputGroup>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComp