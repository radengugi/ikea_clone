import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Modal, ModalBody, ModalHeader, ModalFooter, Badge } from 'reactstrap';
import { getTransaksi } from '../actions'
import { URL_API } from '../helper';

class TransactionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            selectedIdx: null
        }
    }

    printTransaction = () => {
        // console.log("Cek data transaction :", this.props.transaction)
        return this.props.transaction.map((item, index) => {
            return <div className="row shadow p-3 mb-4 rounded" style={{backgroundColor:'#dfe6e9'}}>
                <div className="col-md-3 text-center trans-body">
                    {/* <img src={item.images[0].images} width="100%" /> */}
                    <h4>{item.date}</h4>
                </div>
                <div className="col-md-3 text-center trans-body">
                    <h4>{item.invoice}</h4>
                </div>
                <div className="col-md-2 text-center trans-body">
                    <h4>Rp {item.total_payment.toLocaleString()}</h4>
                </div>
                <div className="col-md-2 text-center trans-body">
                    <Badge color="danger">{item.status}</Badge>
                </div>
                <div className="col-md-2 text-center trans-body">
                    <Button color="warning" className="mr-2" onClick={() => this.setState({ modal: !this.state.modal, selectedIdx: index })}>Detail</Button>
                    {
                        this.props.role == "User" ?
                            <Button color="success" onClick={() => this.btnPaid(this.props.transaction[0].idtransaction)} >Paid</Button>
                            : <Button color="info" >Confirm</Button>
                    }
                </div>
            </div>
        })
    }

    btnPaid = (id) => {
        if (this.props.transaction[0].idstatus == 6) {
            axios.patch(URL_API + `/transaction/update-admin/${id}`)
            .then(res => {
                console.log("cek unpaid", res.data)
                // getUserTransaction()
            }).catch(err => {
                console.log("Error unpaid :", err)
            })
        }
    }

    render() {
        let { transaction } = this.props
        return (
            <div>
                {
                    this.state.selectedIdx != null &&
                    <Modal size="lg" isOpen={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal, selectedIdx: null })}>
                        <ModalHeader style={{backgroundColor:'#f5cd79'}}>
                            <h3>Detail {transaction[this.state.selectedIdx].invoice} <Badge color="danger">{transaction[this.state.selectedIdx].status}</Badge></h3>
                        </ModalHeader>
                        <ModalBody style={{backgroundColor:'#f7f1e3'}}>
                            {/* <span ><b>Pemesan :</b><p>{transaction[this.state.selectedIdx].username}</p></span> */}
                            <div className="row">
                                <span className="col-md-6"><b>Date :</b><p>{transaction[this.state.selectedIdx].date}</p></span>
                                <span className="col-md-6"><b>Note :</b><p>{transaction[this.state.selectedIdx].note}</p></span>
                            </div>
                            <table className="table">
                                <thead className="text-center">
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Nama</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col">Harga</th>
                                        <th scope="col" >Sub. Total</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {transaction[this.state.selectedIdx].transaksi_detail.map((item, index) =>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.type}</td>
                                            <td>{item.qty}</td>
                                            <td className="text-right">Rp. {item.harga.toLocaleString()}</td>
                                            <td className="text-right">Rp. {(item.harga * item.qty).toLocaleString()}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="row p-2">
                                <span className="col-md-9"><b>Ongkir</b></span>
                                <span className="col-md-3 text-right"><b>Rp {transaction[this.state.selectedIdx].ongkir.toLocaleString()}</b></span>
                            </div>
                            <div className="row p-2">
                                <span className="col-md-9"><b>Total Payment</b></span>
                                <span className="col-md-3 text-right"><b>Rp {transaction[this.state.selectedIdx].total_payment.toLocaleString()}</b></span>
                            </div>
                        </ModalBody>
                        <ModalFooter style={{backgroundColor:'#f7f1e3'}}>
                            <Button outline color="primary" onClick={() => this.setState({ modal: !this.state.modal, selectedIdx: null })}>Close</Button>
                        </ModalFooter>
                    </Modal>
                }
                <h1 className="text-center mt-5">Transaction History</h1>
                <div className="m-5">
                    {this.printTransaction()}
                </div>
            </div>
        );
    }
}

const mapToProps = ({ authReducer, productReducers }) => {
    return {
        ...authReducer,
        products: productReducers.products_list
    }
}

export default connect(mapToProps, { getTransaksi })(TransactionPage);