import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledButtonDropdown, UncontrolledDropdown, InputGroup, Input, InputGroupAddon, Dropdown } from 'reactstrap';
import { authLogout } from '../actions'
import CartPage from '../pages/cartPage'

class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buka: false,
            openSearch: false,
            dataSearch: [],
            order: 1
        }
    }
    toggle = () => {
        this.setState({ buka: !this.state.buka })
    }

    handleSearch = () => {
        if (this.search.value == "") {
            this.setState({ openSearch: false, dataSearch: [] })
        } else {
            let dataSearch = this.props.products.filter(item => item.nameProduct.toLowerCase().includes(this.search.value.toLowerCase()))
            this.setState({ openSearch: dataSearch.length > 0 ? true : false, dataSearch })
        }
    }

    printSearch = () => {
        return this.state.dataSearch.map((item, index) => {
            return <DropdownItem>{item.nameProduct}</DropdownItem>
        })
    }

    printCart = () => {
        return this.props.cart.map((item, index) => {
            return <DropdownItem><img src={item.image} width='50px' /> : {item.qty}</DropdownItem>
        })
    }

    render() {
        console.log(this.state.dataSearch, this.state.openSearch)
        return (
            <div className="container-fluid">
                <div>
                    <ul type="none" className="d-flex m-2" style={{ justifyContent: 'space-between', color: 'blue' }}>
                        <li>Indonesia</li>
                        <li><Link>Bahasa</Link></li>
                        <li><Link>Informasi Toko</Link></li>
                        <li><Link>Kebijakan Pengembalian</Link></li>
                        <li><Link>IKEA Bisnis</Link></li>
                        <li><Link>Lacak Pengiriman</Link></li>
                        <li><Link>Katalog dan Brosur</Link></li>
                        <li><Link>Program Perencanaan</Link></li>
                        <li><Link to="/login"><a>Masuk atau Daftar</a></Link></li>
                    </ul>
                </div>
                <Navbar expand="md" style={{ backgroundColor: '#FFFFFF' }}>
                    <NavbarBrand>
                        <Link to="/">
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/logos/IKEA_logo.svg"
                                width="100px" />
                        </Link>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.buka} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to="/products" className="nav-link" style={{ color: 'black', fontWeight: 'bold' }}>Products</Link>
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
                        <UncontrolledButtonDropdown>
                            <DropdownToggle id="caret" color="info" className="mx-2" style={{ display: 'flex', width: '4.5vw' }}>
                                <span className="material-icons" style={{ width: '100%' }}>shopping_cart</span>
                                <div className="count mx-2">{this.props.cart.length}</div>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header className='row'>{this.printCart()}</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem><Link to="/cart">To Cart Menu</Link></DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        <InputGroup size="sm" style={{ width: '15%' }}>
                            <Input placeholder="Cari..." onChange={this.handleSearch} innerRef={elemen => this.search = elemen} />
                            <InputGroupAddon addonType="append">
                                <Dropdown isOpen={this.state.openSearch} toggle={this.handleSearch}>
                                    <DropdownToggle className="btn btn-primary btn-sm material-icons">
                                        search
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {this.printSearch()}
                                    </DropdownMenu>
                                </Dropdown>
                            </InputGroupAddon>
                        </InputGroup>
                        {
                            this.props.username ?
                                <UncontrolledDropdown>
                                    <DropdownToggle nav caret style={{ color: 'gray' }}>
                                        Hello, {this.props.username}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {
                                            this.props.role == "user" ?
                                                <>
                                                    <DropdownItem>
                                                        Profile
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        Cart
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        History
                                                    </DropdownItem>
                                                </> :
                                                <>
                                                    <DropdownItem>
                                                        <Link to="/product-management" style={{ textDecoration: 'none', color: 'gray' }}>
                                                            Product Management
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        Transaction Management
                                                    </DropdownItem>
                                                </>
                                        }
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.props.authLogout}>
                                            Logout
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                :
                                null
                        }
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = ({ authReducer, productReducers }) => {
    return {
        ...authReducer,
        products: productReducers.products_list
    }
}

export default connect(mapStateToProps, { authLogout })(NavbarComp);
