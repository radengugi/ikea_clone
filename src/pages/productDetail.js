import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Collapse, Input } from 'reactstrap';
import { URL_API } from '../helper'
import { Link } from 'react-router-dom';
import { updateCart, getCart } from '../actions'

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            thumbnail: 0,
            openType: false,
            qty: 1,
            modal: false,
            type: "",
            message: "",
            selectedType: {}
        }
    }

    componentDidMount() {
        this.getProductDetail()
    }

    getProductDetail = () => {
        // console.log("Cek Location :", this.props.location)
        axios.get(URL_API + `/products/get-data${this.props.location.search}`)
            .then(res => {
                // console.log('Data Detail :', res.data)
                this.setState({ detail: res.data[0] })
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderImage = () => {
        let { images } = this.state.detail
        return images.map((item, index) => {
            return (
                <img className="select-image mb-1" src={item.images}
                    key={index} width="100%"
                    onClick={() => this.setState({ thumbnail: index })}
                    style={{ borderBottom: this.state.thumbnail == index && "3px solid #407AB1" }} />
            )
        })
    }

    btnPlus = () => {
        // if (this.state.qty < this.state.selectedType.qty) {
        this.setState({ qty: this.state.qty += 1 })
        // } else {
        //     alert('Out of Stock')
        // }
    }

    btnMinus = () => {
        if (this.state.qty > 1) {
            this.setState({ qty: this.state.qty - 1 })
        }
    }

    // onBtnCart = () => {
    //     if (this.state.selectedType.type) {
    //         let nama = this.state.detail.nama
    //         let type = this.state.selectedType.type
    //         let qty = this.state.qty
    //         let images = this.state.detail.images[0]
    //         let harga = this.state.detail.harga
    //         let totalHarga = this.state.qty * this.state.detail.harga
    //         console.log(nama, type, qty, images, harga, totalHarga)

    //         let index = this.props.cart.findIndex(item => item.nama == nama && item.type == type)
    //         console.log('Cek Index:', index)
    //         if (index >= 0) {
    //             this.props.cart[index].qty += qty
    //             this.props.cart[index].totalHarga = this.props.cart[index].qty * harga
    //         } else {
    //             let cart = {
    //                 nama: nama,
    //                 type: type,
    //                 qty: qty,
    //                 images: images,
    //                 harga: harga,
    //                 totalHarga: totalHarga
    //             }
    //             this.props.cart.push(cart)
    //             console.log("Cek props cart :", this.props.cart)
    //         }
    //         axios.post(URL_API + `/transaction/add-cart/${this.props.iduser}`, {
    //             cart: this.props.cart
    //         })
    //             .then(res => {
    //                 console.log('Add to Cart Success :', this.props.cart)
    //                 // this.props.getProductAction()
    //                 // alert('Add to Cart Success')
    //             })
    //             .catch(err => {
    //                 console.log('ERROR cuyy :', err)
    //             })
    //     } else {
    //         alert('Choose Product type first')
    //     }
    // }

    onBtnCart = () => {
        // console.log("Cek props cart :", this.props.location)
        if (this.state.selectedType.type) {
            let token = localStorage.getItem("tkn_id")
            if (token) {
                const headers = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
                axios.post(URL_API + '/transaction/add-cart', {
                    // iduser: this.props.iduser,
                    idproducts: this.state.detail.idproducts,
                    idstock: this.state.selectedType.idproduct_stock,
                    qty: this.state.qty
                }, headers)
                    .then(res => {
                        alert('Add to Cart Success')
                        this.props.getCart(this.props.iduser)
                    })
                    .catch(err => {
                        console.log('ERROR cuyy :', err)
                    })
            }
        } else {
            alert('Choose Product type first')
        }
    }


    render() {
        // console.log('Cek detail :', this.state.detail)
        return (
            <div className="container-fluid">
                <div className="row p-5">
                {
                    this.state.detail.idproducts &&
                    <>
                        <div className="col-md-1">
                            {this.renderImage()}
                        </div>
                        <div className="col-md-7 text-center">
                            <img src={this.state.detail.images[this.state.thumbnail].images} width="450px" />
                        </div>
                        <div className="col-md-4">
                            <div style={{ borderBottom: '1.5px solid gray' }}>
                                <h3 style={{ fontWeight: 'bolder' }}>{this.state.detail.nama}</h3>
                                <h6 className="text-muted">{this.state.detail.deskripsi}</h6>
                                <h2 style={{ fontWeight: 'bolder' }}>Rp {this.state.detail.harga.toLocaleString()}</h2>
                            </div>
                            <div>
                                <span onClick={() => this.setState({ openType: !this.state.openType })} style={{ cursor: 'pointer' }}>
                                    Type : {this.state.selectedType.type}</span>
                                <Collapse isOpen={this.state.openType}>
                                    {
                                        this.state.detail.stock.map((item, index) => {
                                            return (
                                                <div>
                                                    <Button outline color="secondary" size="sm" style={{ width: '100%', border: 'none', textAlign: 'left' }}
                                                        onClick={() => this.setState({ selectedType: item, qty: 1 })} >{item.type} : {item.qty}
                                                    </Button>
                                                </div>
                                            )
                                        })
                                    }
                                </Collapse>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <span>Jumlah :</span>
                                <span style={{ width: '30%', display: 'flex', alignItems: 'center', border: '1px solid gray' }}>
                                    <span type="button" className="material-icons mx-1" onClick={this.btnMinus}>remove</span>
                                    <Input placeholder='Qty' style={{ width: '50%', display: 'inline-block', textAlign:'center' }} value={this.state.qty}></Input>
                                    <span type="button" className="material-icons" onClick={this.btnPlus}>add</span>
                                </span>
                            </div>
                            <div className="my-3" style={{ border: '1px solid black', backgroundColor: '#f5cd79', height:'5vh' }}>
                                <Link to="/cart" style={{ color: 'black' }}>
                                    <h6 type="button" onClick={() => this.onBtnCart(this.props.iduser)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        Add To Cart<span className="material-icons mx-2" >shopping_cart</span>
                                    </h6>
                                </Link>
                            </div>
                        </div>
                    </>
                }
                </div>
                <div className="row" style={{marginTop:'20vh'}}>
                    <div className="col-md-6 left-detail">
                        <img src="https://www.ikea.co.id/webroot/img/logos/return30.png" />
                    </div>
                    <div className="col-md-6 right-detail">
                        <h4>Anda dapat berubah pikiran</h4>
                        <Link style={{color:'#fff'}}>Kebijakan Pengembalian IKEA</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = ({ authReducer }) => {
    return {
        ...authReducer
    }
}

export default connect(mapToProps, { updateCart, getCart })(ProductDetail);