import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Button, Table } from 'reactstrap'
import { updateCart } from '../actions'
import { URL_API } from '../helper';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            display: 'none',
            message: ''
        }
    }

    printCart = () => {
        return this.props.cart.map((item, index) => {
            return <tr>
                <th><img src={item.image} style={{ width: '170px' }} /></th>
                <th>Rp {item.price.toLocaleString()}</th>
                <th>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <span type="button" className="material-icons" onClick={() => this.onBtnMinus(index)}>remove</span>
                        <Input placeholder='Qty' size="sm" style={{ width: '20%', textAlign: 'center' }} value={item.qty}></Input>
                        <span type="button" className="material-icons" onClick={() => this.onBtnPlus(index)}>add</span>
                    </span>
                </th>
                <th>Rp {item.totalHarga.toLocaleString()}</th>
                <th><Button outline color='warning' style={{ border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', left: '1.5vw' }} onClick={() => this.onBtnremove(index)} >
                    <span className="material-icons mx-2">delete</span>
                    Remove</Button>
                </th>
            </tr>
        })
    }

    priceTotal = () => {
        let subTotal = 0
        this.props.cart.forEach((el) => {
            subTotal += el.qty * el.price
        })
        return subTotal
        // return this.props.cart.map((item, index) => {
        //     return (item.qty * item.price)
        // }).reduce((a, b) => a + b, 0)
    }

    onBtnremove = (index) => {
        this.props.cart.splice(index, 1)
        axios.patch(URL_API + `/users/${this.props.id}`, { cart: this.props.cart })
            .then(res => {
                this.props.updateCart([...this.props.cart])
            })
            .catch(err => {
                console.log("ERROR Remove :", err)
            })
    }

    onBtnPlus = (index) => {
        this.props.cart[index].qty += 1
        this.props.updateCart([...this.props.cart]) //untuk memperbarui data props harus menggunakan Temporary data
        // this.setState(()=>{ this.onCountCart(this.state.qtyCart)})
        // axios.patch
    }

    onBtnMinus = (index) => {
        // if (this.props.cart[index] > 1) {
        this.props.cart[index].qty -= 1
        this.props.updateCart([...this.props.cart])
        // axios.patch
        // }
    }

    cartReset = () => {
        let resetCart = []
        axios.patch(URL_API + `/users/${this.props.id}`, {
            cart: resetCart
        })
            .then(res => {
                console.log('Reset cart :', res.data)
            })
            .catch(err => {
                console.log("Error :", err)
            })
    }

    onBtnCheckOut = () => {
        let idUser = this.props.id
        let username = this.props.username
        let time = new Date()
        let totalPayment = this.priceTotal()
        let cart = this.props.cart
        let status = "unpaid"
        let date = time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear()
        let resetCart = []

        if (cart.length > 0) {
            axios.post(URL_API + `/userTransaction`, {
                idUser, username, totalPayment, cart, status, date
            })
                .then(res => {
                    this.setState({
                        display: 'block',
                        message: 'Transaction Success'
                    })
                    this.props.updateCart(resetCart)
                    this.cartReset()
                })
                .catch(err => {
                    console.log('Transaction Failed :', err)
                })
                alert('Input Success')
        }else{
            alert("Anda belum memilih barang")
        }
        // 1. Setiap checkout mengurangi Quantity product dulu, yg ada di reducer
        // 2. axios patch data product karena Quantity stock berubah
        // 3. idUser, username, date, totalPayment, status(paid), cart
        // 4. axios.post = userTransaction
        // 5. data userTransaction ditampilkan di historyPage user & transactionPage admin
    }

    printResume = () => {
        return this.props.cart.map((item, index) => {
            {
                console.log("Check :", this.props.cart);
            }
            return (
                <div className="d-flex justify-content-between align-items-center">
                    <div className="col-md 4">
                        <h6>{item.nameProduct}</h6>
                    </div>
                    <div className="col-md-4">
                        <h6>{item.qty}</h6>
                    </div>
                    <div className="col-md-4">
                        <h6>Rp {this.props.cart[index].qty * item.price}</h6>
                    </div>
                </div>
            );
        });
    };

    render() {
        // console.log(this.props.index)
        return (
            <div className="container">
                <h1 className="text-center mt-5">Your Order Cart</h1>
                <Table hover className="text-center my-5">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Harga</th>
                            <th>Jumlah</th>
                            <th>Total Harga</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printCart()}
                    </tbody>
                </Table>
                <div className="col-md-12">
                    <h1>Ringkasan</h1>
                    <hr></hr>
                </div>
                <div className="d-flex justify-content-between align-items-center text-center">
                    <div className="col-md 4">
                        <h6 >Product Name</h6>
                    </div>
                    <div className="col-md-4">
                        <h6>Quantity</h6>
                    </div>
                    <div className="col-md-4">
                        <h6>Harga</h6>
                    </div>
                </div>
                <hr></hr>
                <div className="text-center">
                    {this.printResume()}
                </div>
                <div className="container my-5" style={{ display: 'flex', alignItems: 'center' }}>
                    <h4 style={{ fontWeight: 'bolder' }}>Total Harga :</h4>
                    <h3 className="mx-2">Rp {this.priceTotal()}</h3>
                </div>
                <div className="col-md 12">
                    <Link to="/history-user">
                        <button type="button" className="btn btn-warning d-flex"
                            style={{ width: "100%", height: "5vh", justifyContent: "center", alignItems: "center" }}
                            onClick={() => this.onBtnCheckOut(this.props.id)}>
                            <span className="material-icons">payment</span>&nbsp;
                            <strong>Bayar</strong>
                        </button>
                    </Link>
                </div >
            </div >
        );
    }
}

const mapToProps = ({ authReducer }) => {
    return {
        ...authReducer
    }
}

export default connect(mapToProps, { updateCart })(CartPage);