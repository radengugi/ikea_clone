import axios from 'axios';
import React from 'react';
import { Button, Table, Input, Badge } from 'reactstrap'
import ModalProduct from '../components/modalsProduct';
import ModalEditProduct from '../components/modalsEditProduct';
import { URL_API } from '../helper';
import { connect } from 'react-redux'
import { getProductAction } from '../actions'

let kursor = {
    cursor: "pointer",
    marginRight: '0.5vw'
}

class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalsEdit: false,
            products: [],
            detailProduk: {},
            thumbnail: 0
        }
    }

    componentDidMount() {
        // this.getDataProduct()
        this.props.getProductAction()
    }

    // getDataProduct = () => {
    //     axios.get(URL_API + `/products`)
    //         .then(res => {
    //             // console.log(res.data)
    //             // this.setState({ products: res.data })
    //             this.props.getProductAction(res.data)
    //         })
    //         .catch(err => {
    //             console.log('ERROR Get :', err)
    //         })
    // }

    printProduct = () => {
        return this.props.products.map((item, index) => {
            return <tr>
                <td>{index + 1}</td>
                <td style={{ width: '20vw', textAlign: 'center' }}>
                    {
                        this.state.thumbnail[0] == index ?
                            <img src={item.image[this.state.thumbnail[1]]} style={{ width: '80%' }} alt={item.nameProduct + index} />
                            :
                            <img src={item.image[0]} style={{ width: '80%' }} alt={item.nameProduct + index} />
                    }
                    <div>
                        {
                            item.image.map((value, idx) => {
                                return <img src={value} style={{ kursor }} width="20%" alt={item.nameProduct + idx}
                                    onClick={() => this.setState({ thumbnail: [index, idx] })} />
                            })
                        }
                    </div>
                </td>
                <td>{item.nameProduct}</td>
                <td>{item.description}</td>
                <td>{item.brand}</td>
                <td>{item.category}</td>
                <td>
                    {
                        item.stock.map((item, index) => {
                            return <h5 style={{ fontSize: '15px' }}>{item.type} : <Badge color={item.qty >= 12 ? "success" : "warning"}>{item.qty}</Badge></h5>
                        })
                    }
                </td>
                <td>Rp {item.price.toLocaleString()}</td>
                <td>
                    <Button type="button" color="warning" onClick={() => this.setState({ detailProduk: item, modalsEdit: !this.state.modalsEdit })}>Edit</Button>{' '}
                    <Button color="danger" onClick={() => this.onBtnDelete(item.id)}>Delete</Button>{' '}
                </td>
            </tr>
        })
    }

    onBtnDelete = (id) => {
        axios.delete(URL_API + `/products/${id}`)
            .then(res => {
                this.getDataProduct()
            })
            .catch(err => {
                console.log(err)
            })
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    toggleEdit = () => {
        this.setState({ modalsEdit: !this.state.modalsEdit })
    }

    // sorting = () => {
    //     if (this.sort.value === "nameAsc") {
    //         axios.get(URL_API + `/products?_sort=nameProduct&_order=asc`)
    //             .then(res => {
    //                 console.log('Sorting Name Asc :', res.data)
    //                 this.setState({ products: res.data })
    //             })
    //             .catch(err => {
    //                 console.log('ERROR Name Asc :', err)
    //             })
    //     } else if (this.sort.value === "nameDesc") {
    //         axios.get(URL_API + `/products?_sort=nameProduct&_order=desc`)
    //             .then(res => {
    //                 console.log('Sorting Name Desc :', res.data)
    //                 this.setState({ products: res.data })
    //             })
    //             .catch(err => {
    //                 console.log('ERROR Name Desc :', err)
    //             })
    //     } else if (this.sort.value === "priceAsc") {
    //         axios.get(URL_API + `/products?_sort=price&_order=asc`)
    //             .then(res => {
    //                 console.log('Sorting Price Asc :', res.data)
    //                 this.setState({ products: res.data })
    //             })
    //             .catch(err => {
    //                 console.log('ERROR Price Asc :', err)
    //             })
    //     } else if (this.sort.value === "priceDesc") {
    //         axios.get(URL_API + `/products?_sort=price&_order=desc`)
    //             .then(res => {
    //                 console.log('Sorting Price Desc :', res.data)
    //                 this.setState({ products: res.data })
    //             })
    //             .catch(err => {
    //                 console.log('ERROR Price Desc :', err)
    //             })
    //     }
    // }

    // Cara kedua
    sorting = () => {
        let field = this.sort.value.split("-")[0]
        let sortType = this.sort.value.split("-")[1]
        axios.get(URL_API + `/products?_sort=${field}&_order=${sortType}`)
            .then(res => {
                console.log(field, sortType, res.data)
                this.setState({ products: res.data })
                // this.props.getProductAction()
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="text-center mt-5">
                        <h2>Product Management</h2>
                        <div style={{ display: 'flex', float: 'right' }}>
                            <Input type='select' style={{ width: '20vw', marginRight: '1vw' }} onChange={this.sorting} innerRef={elemen => this.sort = elemen}>
                                {/* <option value="nameAsc">Nama Asc</option>
                                <option value="nameDesc">Nama Desc</option>
                                <option value="priceAsc">Harga Asc</option>
                                <option value="priceDesc">Harga Desc</option> */}
                                {/* Jika menggunakan cara kedua */}
                                <option value="name-asc">Nama Asc</option>
                                <option value="name-desc">Nama Desc</option>
                                <option value="price-asc">Harga Asc</option>
                                <option value="price-desc">Harga Desc</option>
                            </Input>
                            <Button type="button" color="primary" style={{ float: 'right' }} onClick={() => this.setState({ modal: !this.state.modal })}>Add Data</Button>
                        </div>
                        <ModalEditProduct modal={this.state.modalsEdit} detailProduk={this.state.detailProduk}
                            btClose={() => this.setState({ modalsEdit: !this.state.modalsEdit })} getDataProduct={this.props.getProductAction} />
                        <ModalProduct modal={this.state.modal}
                            btClose={() => this.setState({ modal: !this.state.modal })} getDataProduct={this.props.getProductAction} />
                    </div>
                    <Table hover style={{ marginTop: '13vh', textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Nama</th>
                                <th>Deskripsi</th>
                                <th>Brand</th>
                                <th>Kategori</th>
                                <th>Stock</th>
                                <th>Harga</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.printProduct()}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

const mapToProps = ({ productReducers }) => {
    return {
        products: productReducers.products_list
    }
}

export default connect(mapToProps, {getProductAction})(ProductManagement);