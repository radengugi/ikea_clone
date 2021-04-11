import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Collapse, Input } from 'reactstrap';
import { URL_API } from '../helper'
import { getProductAction } from '../actions/productAction'
import { Link } from 'react-router-dom';

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
        // console.log(this.props.location)
        axios.get(URL_API + `/products${this.props.location.search}`)
            .then(res => {
                console.log('Data Detail :', res.data)
                this.setState({ detail: res.data[0] })
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderImage = () => {
        let { image } = this.state.detail
        return image.map((item, index) => {
            return (
                <img className="select-image mb-1" src={item} key={index} width="100%" onClick={() => this.setState({ thumbnail: index })}
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

    onBtnCart = () => {
        if (this.state.selectedType.type) {
            let nameProduct = this.state.detail.nameProduct
            let type = this.state.selectedType.type
            let qty = this.state.qty
            let image = this.state.detail.image[0]
            let price = this.state.detail.price
            let totalHarga = this.state.qty * this.state.detail.price
            console.log(nameProduct, type, qty, image, price, totalHarga)

            let index = this.props.cart.findIndex(item => item.nameProduct == nameProduct && item.type == type)
            console.log('Cek Index:', index)
            if (index >= 0) {
                this.props.cart[index].qty += qty
                this.props.cart[index].totalHarga = this.props.cart[index].qty * price
            } else {
                let cart = {
                    nameProduct: nameProduct,
                    type: type,
                    qty: qty,
                    image: image,
                    price: price,
                    totalHarga: totalHarga
                }
                this.props.cart.push(cart)
            }
            axios.patch(URL_API + `/users/${this.props.id}`, {
                cart: this.props.cart
            })
                .then(res => {
                    console.log('Add to Cart Success :', this.props.cart)
                    this.props.getProductAction()
                    // alert('Anda belum mengisi Type Stock')
                })
                .catch(err => {
                    console.log('ERROR :', err)
                })
        } else {
            alert('Choose Product type first')
        }
    }


    render() {
        return (
            <div className="row p-5">
                {
                    this.state.detail.id &&
                    <>
                        <div className="col-md-1">
                            {this.renderImage()}
                        </div>
                        <div className="col-md-7">
                            <img src={this.state.detail.image[this.state.thumbnail]} width="450px" />
                        </div>
                        <div className="col-md-4">
                            <div style={{ borderBottom: '1.5px solid gray' }}>
                                <h3 style={{ fontWeight: 'bolder' }}>{this.state.detail.nameProduct}</h3>
                                <h6 className="text-muted">{this.state.detail.category}</h6>
                                <h2 style={{ fontWeight: 'bolder' }}>Rp {this.state.detail.price.toLocaleString()}</h2>
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
                                    <Input placeholder='Qty' style={{ width: '50%', display: 'inline-block' }} value={this.state.qty}></Input>
                                    <span type="button" className="material-icons" onClick={this.btnPlus}>add</span>
                                </span>
                            </div>
                            <div className="my-3" style={{ border: '1px solid black', backgroundColor: '#f6b93b' }}>
                                <Link to="/cart" style={{ color: 'black' }}>
                                    <h6 type="button" onClick={() => this.onBtnCart(this.props.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        Add To Cart<span className="material-icons mx-2" >shopping_cart</span>
                                    </h6>
                                </Link>
                            </div>
                        </div>
                    </>
                }
            </div>
        );
    }
}

const mapToProps = ({ authReducer }) => {
    return {
        ...authReducer
    }
}

export default connect(mapToProps, { getProductAction })(ProductDetail);