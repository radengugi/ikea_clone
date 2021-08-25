import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Badge, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { URL_API } from '../helper';
import { getProductAction, getTransactionAction, getTransaksi } from '../actions'

class TransactionManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTransaction: [],
            modalsEdit: false,
            detailProduct: {}
        }
    }

    componentDidMount() {
        this.getDataTransaction()
    }

    getDataTransaction = () => {
        axios.get(URL_API + `/transaction/get-transaksi/${this.props.iduser}`)
            .then(res => {
                // console.log("Cek Transaksi :",res.data)
                this.setState({ dataTransaction: res.data })
                // this.props.getTransaksi(this.props.iduser)
                // this.props.getTransactionAction(res.data)
            })
            .catch(err => {
                console.log('Error :', err)
            })
    }

    updateStatusAdmin = () => {
        let idtransaction = this.state.dataTransaction.map((item, index) => {
            return item.idtransaction
        })
        axios.patch(URL_API + `/transaction/update-admin`, { idtransaction })
            .then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    printTransUser = () => {
        // let unpaidTrans = this.state.dataTransaction.filter(item => item.status == 'unpaid')
        console.log('Transaction List :', this.state.dataTransaction)
        let { dataTransaction } = this.state
        return dataTransaction.map((item, index) => {
            return item.transaksi_detail.map((el, idx) => {
                return (
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{item.date}</td>
                        <td>{item.invoice}</td>
                        <td>Rp {item.total_payment.toLocaleString()}</td>
                        <td>
                            <Button type="button" size="sm" color="danger" disabled>
                                {item.status}
                            </Button>
                        </td>
                        <td>
                            <Button type="button" size="sm" color="warning" onClick={() => this.setState({ modalsEdit: !this.state.modalsEdit, idDetail: idx })}>
                                Detail
                            </Button> &nbsp;
                                {item.idstatus === 6 || item.idstatus === 8 ? (
                                <>
                                    <Button type="button" size="sm" color="secondary" disabled>
                                        Confirm
                                </Button>
                                </>
                                ) : (
                                <>
                                    <Button type="button" size="sm" color="success" onClick={() => this.updateStatusAdmin()}>
                                        Confirm
                                </Button>
                                </>
                                )}
                        </td>
                    </tr>
                )
            })
        })
    }

    printModals = () => {
        return (
            <div>
                <Modal isOpen={this.state.modalsEdit}>
                    <ModalHeader>Detail Transaction</ModalHeader>
                    <ModalBody>{this.printDetail()}</ModalBody>
                    <ModalFooter>
                        <Button color="warning" onClick={() => this.setState({ modalsEdit: !this.state.modalsEdit })}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    printDetailProduk = () => {
        console.log("data transaksi", this.state.dataTransaction);
        return this.state.dataTransaction.map((item, index) => {
            return item.transaksi_detail.map((e, idx) => {
                return (
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{e.nama}</td>
                        <td>{e.type}</td>
                        <td>{e.harga}</td>
                        <td>{e.qty}</td>
                        <td>{e.harga * e.qty}</td>
                        <td>
                            <Button type="button" size="sm" color="danger" disabled>
                                {item.status}
                            </Button>
                        </td>
                    </tr>
                );
            });
        });
    };

    printDetail = () => {
        console.log("data transaksi", this.state.dataTransaction);
        return this.state.dataTransaction.map((item, index) => {
            return item.transaksi_detail.map((e, idx) => {
                return (
                    <div class="container">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6">
                                    <p>Tanggal : {item.date}</p>
                                </div>
                                <div class="col-md-6">
                                    <p>Status : {item.status}</p>
                                </div>
                                <div class="col-md-12">
                                    <p>Invoice : {item.invoice}</p>
                                </div>
                                <div class="col-md-12">
                                    <p>Pemesan : {item.iduser}</p>
                                </div>
                                <div class="col-md-12">
                                    <p>Note : {item.note}</p>
                                </div>
                                <div
                                    class="col-md-12"
                                    style={{
                                        width: "auto",
                                        overflowX: "scroll",
                                    }}
                                >
                                    <div className="p-2">
                                        {/* <h3 className="text-center">History</h3> */}
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Nama</th>
                                                    <th>Type</th>
                                                    <th>Harga</th>
                                                    <th>Quantity</th>
                                                    <th>Total Harga</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>{this.printDetailProduk()}</tbody>
                                        </Table>
                                    </div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <p>Ongkir : </p>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <p>:</p>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <p style={{ textAlign: "right" }}>{item.ongkir}</p>
                                </div>
                                <div className="col-md-4">
                                    <p>Total </p>
                                </div>
                                <div className="col-md-4">
                                    <p>:</p>
                                </div>
                                <div className="col-md-4">
                                    <p style={{ textAlign: "right" }}>
                                        {item.ongkir + e.harga * e.qty}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        });
    };

    render() {
        return (
            <div className="container text-center my-5">
                <h2>Order Summary</h2>
                <Table hover className="my-5">
                    <thead>
                        <th>No.</th>
                        <th>Date</th>
                        <th>Invoice</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {this.printTransUser()}
                    </tbody>
                </Table>
                {this.printModals()}
            </div>
        );
    }
}

const mapToProps = ({ productReducers, transactionReducer, authReducer }) => {
    return {
        products: productReducers.products_list,
        transaction: transactionReducer.transaction_list,
        ...authReducer
    }
}

export default connect(mapToProps, { getTransactionAction })(TransactionManagement);