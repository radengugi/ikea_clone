import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Badge, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { URL_API } from '../helper';
import { getTransactionAction } from '../actions'

class HistoryUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTransaction: [],
            modaldetail: false,
            detailProduct: {},
            idDetail: 0,
            idtransaction: 0
        }
    }


    componentDidMount() {
        this.getData();
    }

    getData = () => {
        let history = [];
        axios.get(URL_API + `/transaction/get-transaksi/${this.props.iduser}`)
            .then((res) => {
                console.log("Cek Data :", res.data);
                this.setState({ dataTransaction: res.data });
                res.dataTransaction.map((item, idx) => {
                    if (item.iduser == this.props.iduser) {
                        history.push(item.iduser);
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    dataTrans = () => {
        this.state.dataTransaction.map((item, index) => {
            return item.idtransaction;
        });
    };

    updateStatus = () => {
        // api update qty cart
        let idtransaction = this.state.dataTransaction.map((item, index) => {
            return item.idtransaction;
        });
        console.log("idtransaksi", this.dataTrans());
        axios.patch(URL_API + `/transaction/update-status`, { idtransaction })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    modalDetail = () => {
        this.setState({ modaldetail: !this.state.modalDetail });
    };

    printProduk = () => {
        console.log("data transaksihistory", this.state.dataTransaction);
        return this.state.dataTransaction.map((item, index) => {
            return item.transaksi_detail.map((e, idx) => {
                if (item.iduser == this.props.iduser) {
                    return (
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{item.date}</td>
                            <td>{item.invoice}</td>
                            <td>{item.total_payment}</td>
                            <td>
                                <Button type="button" size="sm" color="danger" disabled>
                                    {item.status}
                                </Button>
                            </td>
                            <td>
                                <Button
                                    type="button"
                                    size="sm"
                                    color="primary"
                                    onClick={() =>
                                        this.setState({
                                            modalDetail: !this.state.modalDetail,
                                            idDetail: idx,
                                        })
                                    }
                                >
                                    Detail
                                </Button>
                                &nbsp;
                                {/* <Button
                                type="button"
                                size="sm"
                                color="success"
                                onClick={() => this.updateStatus()}
                                >
                                Paid
                                </Button> */}
                                {item.idstatus === 6 ? (
                                    <>
                                        <Button
                                            type="button"
                                            size="sm"
                                            color="success"
                                            onClick={() => this.updateStatus()}
                                        >
                                            Paid
                                        </Button>
                                    </>
                                    ) : (
                                    <>
                                        <Button type="button" size="sm" color="secondary" disabled>
                                            Paid
                                        </Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    );
                }
            });
        });
    };

    printDetailProduk = () => {
        // console.log("data transaksi", this.state.data[0].idtransactions);
        return this.state.dataTransaction.map((item, index) => {
            return item.transaksi_detail.map((e, idx) => {
                if (item.iduser == this.props.iduser) {
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
                }
            });
        });
    };

    printModal = () => {
        return (
            <div>
                <Modal isOpen={this.state.modalDetail}>
                    <ModalHeader>Detail Transaction</ModalHeader>
                    <ModalBody>
                        <div class="container">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-6">
                                        <p>Tanggal :</p>
                                    </div>
                                    <div class="col-md-6">
                                        <p>Status : </p>
                                    </div>
                                    <div class="col-md-12">
                                        <p>Invoice : </p>
                                    </div>
                                    <div class="col-md-12">
                                        <p>Pemesan : </p>
                                    </div>
                                    <div class="col-md-12">
                                        <p>Note : </p>
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
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>{this.printDetailProduk()}</tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div class="col-md-4 mt-2">
                                        <p>Ongkir : </p>
                                    </div>
                                    <div class="col-md-4 mt-2">
                                        <p>:</p>
                                    </div>
                                    <div class="col-md-4 mt-2">
                                        <p style={{ textAlign: "right" }}></p>
                                    </div>
                                    <div class="col-md-4">
                                        <p>Total </p>
                                    </div>
                                    <div class="col-md-4">
                                        <p>:</p>
                                    </div>
                                    <div class="col-md-4">
                                        <p style={{ textAlign: "right" }}></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* {this.printDetail()} */}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="warning"
                            onClick={() =>
                                this.setState({ modalDetail: !this.state.modalDetail })
                            }
                        >
                            Close
                </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    };

    render() {
        console.log("iduser", this.state.dataTransaction);
        return (
            <div className="container p-2">
                <h3 className="text-center">History</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>Id User</th>
                            <th>Date</th>
                            <th>Invoice</th>
                            <th>Total Harga</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{this.printProduk()}</tbody>
                </Table>
                {this.printModal()}
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

export default connect(mapToProps, { getTransactionAction })(HistoryUser);