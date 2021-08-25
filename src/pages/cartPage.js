import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Button, Table, FormGroup, Label } from 'reactstrap'
import { updateCart, deleteCart, getCart, getTransaksi } from '../actions'
import { URL_API } from '../helper';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            display: 'none',
            message: '',
            detail: []
        }
    }

    printCart = () => {
        return this.props.cart.map((item, index) => {
            return <tr>
                <th><img src={item.images[0].images} style={{ width: '170px' }} /></th>
                <th>Rp {item.harga.toLocaleString()}</th>
                <th>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <span type="button" className="material-icons" onClick={() => this.onBtnMinus(index)}>remove</span>
                        <Input placeholder='Qty' size="sm" style={{ width: '20%', textAlign: 'center' }} value={item.qty}></Input>
                        <span type="button" className="material-icons" onClick={() => this.onBtnPlus(index)}>add</span>
                    </span>
                </th>
                <th>Rp {(item.harga * item.qty).toLocaleString()}</th>
                <th><Button outline color='warning' style={{ border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', left: '1.5vw' }}
                    onClick={() => this.props.deleteCart(item.idcart, this.props.iduser)} >
                    <span className="material-icons mx-2">delete</span>
                    Remove</Button>
                </th>
            </tr>
        })
    }

    priceTotal = () => {
        let subTotal = 0
        this.props.cart.forEach(item => subTotal += item.qty * item.harga)
        return { subTotal: subTotal + (subTotal * 0.025), ongkir: subTotal * 0.025 }
    }

    // onBtnremove = (index) => {
    //     this.props.cart.splice(index, 1)
    //     axios.patch(URL_API + `/users/${this.props.id}`, { cart: this.props.cart })
    //         .then(res => {
    //             this.props.updateCart([...this.props.cart])
    //         })
    //         .catch(err => {
    //             console.log("ERROR Remove :", err)
    //         })
    // }

    onBtnPlus = (index) => {
        // console.log("Plus Cek :", index)
        let { iduser, cart, updateCart } = this.props
        // if (cart[index].qty < this.props.products[index].stock[index].qty) {
        cart[index].qty += 1
        this.props.updateCart({ iduser, qty: cart[index].qty, idcart: cart[index].idcart }) //untuk memperbarui data props harus menggunakan Temporary data
        // } else{
        //     alert("Product Out Of Stock")
        // }
    }

    onBtnMinus = (index) => {
        if (this.props.cart[index].qty < 1) {
            let { iduser, cart, updateCart } = this.props
            this.props.deleteCart(cart[index].idcart)
            this.props.getCart()
        } else {
            // console.log("Minus Cek :", index)
            let { iduser, cart, updateCart } = this.props
            this.props.cart[index].qty -= 1
            this.props.updateCart({ iduser, qty: cart[index].qty, idcart: cart[index].idcart })
        }
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

    // onBtnCheckOut = () => {
    //     // untuk mengurangi data product
    //     this.props.cart.forEach((item, index) => {
    //         this.props.products.forEach((value, index) => {
    //             if (item.nameProduct == value.nameProduct) {
    //                 let idxStock = value.stock.findIndex(val => {
    //                     return val.type == item.type
    //                 })
    //                 // console.log('Before :',value.stock[idxStock])
    //                 value.stock[idxStock].qty -= item.qty
    //                 // console.log('After :',value.stock[idxStock])

    //                 axios.patch(URL_API + `/products/${value.id}`, {
    //                     stock: value.stock
    //                 })
    //                     .then(res => {
    //                         console.log('Product Reduce :', res.data)
    //                     })
    //                     .catch(err => {
    //                         console.log(err)
    //                     })
    //             }
    //         })
    //     })

    //     let idUser = this.props.id
    //     let username = this.props.username
    //     let time = new Date()
    //     let totalPayment = this.priceTotal()
    //     let cart = this.props.cart
    //     let status = "unpaid"
    //     let date = time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear()
    //     let resetCart = []

    //     if (cart.length > 0) {
    //         axios.post(URL_API + `/userTransaction`, {
    //             idUser, username, totalPayment, cart, status, date
    //         })
    //             .then(res => {
    //                 this.setState({
    //                     display: 'block',
    //                     message: 'Transaction Success'
    //                 })
    //                 this.props.updateCart(resetCart)
    //                 this.cartReset()
    //             })
    //             .catch(err => {
    //                 console.log('Transaction Failed :', err)
    //             })
    //         alert('Input Success')
    //     } else {
    //         alert("Anda belum memilih barang")
    //     }

    // }

    invoiceGenerate = (min = 1000, max = 500000) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        return "#INVOICE/" + num;
    };

    onBtnCheckOut = () => {
        this.props.cart.forEach((item, index) => {
            this.props.products.forEach((value, idx) => {
                if (item.nama == value.nama) {
                    let idxStock = value.stock.findIndex(val => {
                        return val.type == item.type
                    })
                    console.log("idxSTok", idxStock)
                    value.stock[idxStock].qty -= item.qty
                    console.log("CEK", value.stock[idxStock].qty)
                    console.log("VALUEEE", value.stock)
                    let images = value.images
                    let nama = value.nama
                    let brand = value.brand
                    let deskripsi = value.deskripsi
                    let harga = value.harga
                    let stock = [
                        { "idtb_product_stok": value.stock[0].idproduct_stock, "type": value.stock[0].type, "qty": value.stock[0].qty, "idtb_product": value.idproducts },
                        // { "idtb_product_stok": value.stock[1].idproduct_stock, "type": value.stock[1].type, "qty": value.stock[1].qty, "idtb_product": value.idproducts }
                    ]
                    console.log("CEK STOK", stock)
                    let tempDetail = this.state.detail
                    tempDetail.push({ idproducts: value.idproducts, idstock: value.stock[idxStock].idstock, idcart: item.idcart, qty: item.qty })
                    this.setState({ detail: tempDetail })

                    // console.log("CEK PATCH", nama, brand, deskripsi, harga, images, stock)
                    // console.log("idproduct", value.idproducts)
                    // console.log(`stok = [{idtb_product_stok = ${value.stock[0].idstock}, type = ${value.stock[0].type}, qty = ${value.stock[0].qty}}, {idtb_product_stok = ${value.stock[1].idstock}, type = ${value.stock[1].type}, qty = ${value.stock[1].qty}}]`)
                    axios.patch(URL_API + `/products/${value.idproducts}`, {
                        nama, brand, deskripsi, harga, idstatus: 1, images, stock
                    }).then(res => {
                        console.log("pengurangan products", res.data)

                    }).catch(err => console.log(err))


                }
            })
        });

        // let invoice = this.invoiceGenerate()
        let invoice = `#INVOICE/${new Date().getTime()}`
        let iduser = this.props.iduser
        let ongkir = this.priceTotal().ongkir
        let total_payment = this.priceTotal().subTotal
        let note = this.note.value
        let idstatus = 6
        let detail = this.props.cart
        // console.log({
        //     invoice: invoice,
        //     iduser: iduser,
        //     // username: username,
        //     ongkir: ongkir,
        //     note: note,
        //     idstatus: idstatus,
        //     total_payment: total_payment,
        //     detail: detail
        // })

        // if (qty.length > 0) {
        let token = localStorage.getItem("tkn_id")
        if (token) {
            const headers = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            axios.post(URL_API + `/transaction/checkout`, {
                invoice, iduser, ongkir, total_payment, note, idstatus, detail
            }, headers)
                .then(res => {
                    // if (this.props.cart.length === 0) {
                    // this.setState({
                    //     display: 'block',
                    //     message: 'Transaction Success'
                    // })
                    console.log("Cek Add :", res.data)
                    this.props.getCart(this.props.iduser)
                    this.props.getTransaksi(this.props.iduser)
                    this.note.value = null
                    // this.cartReset()
                    // }
                })
                .catch(err => {
                    console.log('Transaction Failed :', err)
                })
            alert('Input Success')
            // } else {
            //     alert("Anda belum memilih barang")
            // }
        }
    }

    printResume = () => {
        return this.props.cart.map((item, index) => {
            {
                // console.log("Check :", this.props.cart);
            }
            return (
                <div className="d-flex justify-content-between align-items-center">
                    <div className="col-md 4">
                        <h6>{item.nama}</h6>
                    </div>
                    <div className="col-md-4">
                        <h6>{item.qty}</h6>
                    </div>
                    <div className="col-md-4">
                        <h6>Rp {(this.props.cart[index].qty * item.harga).toLocaleString()}</h6>
                    </div>
                </div>
            );
        });
    };

    render() {
        // console.log("Cek Cart :",this.props.cart)
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
                <div className="shadow p-4 mb-3 rounded col-md-12">
                    <div>
                        <h3>Ringkasan</h3>
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
                </div>
                <div className="shadow p-4 mb-3 bg-white rounded">
                    <h4 style={{ fontWeight: 'bolder' }}>Total Harga :</h4>
                    <h3 className="mx-2">Rp {this.priceTotal().subTotal.toLocaleString()}</h3>
                    <FormGroup>
                        <Label for="ongkir">Biaya Pengiriman</Label>
                        <Input type="text" id="ongkir" defaultValue={'Rp. ' + this.priceTotal().ongkir.toLocaleString()} innerRef={elemen => this.ongkir = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="note">Notes</Label>
                        <Input type="textarea" id="note" innerRef={elemen => this.note = elemen} />
                    </FormGroup>
                </div>
                <div className="col-md 12 my-4">
                    {/* <Link to="/history"> */}
                    <button type="button" className="btn btn-warning d-flex"
                        style={{ width: "100%", height: "5vh", justifyContent: "center", alignItems: "center" }}
                        onClick={() => this.onBtnCheckOut(this.props.iduser)}>
                        <span className="material-icons">payment</span>&nbsp;
                        <strong>Checkout</strong>
                    </button>
                    {/* </Link> */}
                </div >
                <div className="head-secure">
                    <div className="secure">
                        <span class="material-icons">lock</span>
                        <div>
                            <h5>Belanja aman</h5>
                            <span>Kami menggunakan teknologi keamanan SSL terbaru untuk mengenkripsi semua informasi pribadi Anda.</span>
                        </div>
                    </div>
                    <div className="secure">
                        <span class="material-icons">payment</span>
                        <div>
                            <h5>Pilihan pembayaran</h5>
                            <span>Kami menerima semua kartu kredit dan debit serta metode pembayaran online.</span>
                        </div>
                    </div>
                    <div className="secure">
                        <span class="material-icons">replay_30</span>
                        <div>
                            <h5>Pengembalian 30 Hari</h5>
                            <span>Pengalaman menyenangkan Anda saat berbelanja di IKEA sangat penting bagi kami. Jika Anda merasa kurang puas dengan produk kami, Anda dapat menukarkannya atau mendapatkan pengembalian penuh dalam waktu 30 hari. Baca <a href="#">Kebijakan pengembalian 30 hari.</a></span>
                        </div>
                    </div>
                    <div className="secure">
                        <span class="material-icons">mail</span>
                        <div>
                            <h5>Hubungi kami</h5>
                            <span>Jika ada pertanyaan terkait pesanan Anda, silakan periksa Bagian FAQ atau hubungi Layanan Pelanggan IKEA di 021 – 2985 3900 atau gunakan formulir hubungi kami. Anda juga dapat Baca syarat dan ketentuan umum.</span>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapToProps = ({ authReducer, productReducers }) => {
    return {
        ...authReducer,
        products: productReducers.products_list
    }
}

export default connect(mapToProps, { updateCart, deleteCart, getCart, getTransaksi })(CartPage);