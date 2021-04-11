import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Table, Badge, Button } from 'reactstrap';
import ModalProduct from '../components/modalsProduct'
import ModalEditProduct from '../components/modalsEditProduct'
import { URL_API } from '../helper';
import { getProductAction, getTransactionAction } from '../actions'

class HistoryUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTransaction: [],
            modal: false,
            modalEdit: false,
            detailProduct: {}
        }
    }

    componentDidMount() {
        this.getDataTransaction()
    }

    getDataTransaction = () => {
        axios.get(URL_API + `/userTransaction/?idUser=${this.props.id}`)
            .then(res => {
                this.setState({ dataTransaction: res.data })
                // this.props.getTransactionAction(res.data)
            })
            .catch(err => {
                console.log('Error :', err)
            })
    }

    printTransUser = () => {
        // let unpaidTrans = this.state.dataTransaction.filter(item => item.status == 'unpaid')
        console.log('Transaction List :', this.state.dataTransaction)
        let { dataTransaction } = this.state
        return dataTransaction.map((item, index) => {
            return <tr>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.username}</td>
                <td>Rp {item.totalPayment.toLocaleString()}</td>
                <td>{item.status}</td>
                {/* <td>{item.username}</td>
                <td>{item.cart}</td> */}
                {/* <td>
                    {item.stock.map((item, index) => {
                        return (
                            <h5>
                                {item.type} :{" "}
                                <Badge color={item.qty >= 12 ? "success" : "warning"}>{item.qty}</Badge>
                            </h5>
                        );
                    })}
                </td> */}
                <td>
                    <Button type="button" size="sm" color="warning" onClick={() => this.setState({ detailProduk: item, modalEdit: !this.state.modalEdit })}> Detail</Button>
                    <Button size="sm" color="danger">Delete</Button>
                </td>
            </tr>
        })
    }

    render() {
        return (
            <div className="container text-center my-5">
                <h2>Order Summary</h2>
                {/* <ModalEditProduct modal={this.state.modalsEdit} detailProduk={this.state.detailProduk}
                    btClose={() => this.setState({ modalsEdit: !this.state.modalsEdit })} getDataProduct={this.props.getProductAction} />
                <ModalProduct modal={this.state.modal}
                    btClose={() => this.setState({ modal: !this.state.modal })} getDataProduct={this.props.getProductAction} /> */}
                <Table hover className="my-5">
                    <thead>
                        <th>No.</th>
                        <th>Date</th>
                        <th>Username</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {this.printTransUser()}
                    </tbody>
                </Table>
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