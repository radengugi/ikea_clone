import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { URL_API } from '../helper';
import axios from 'axios'

class ModalProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: [],
            image: []
        }
    }

    onBtnAdd = () => {
        console.log(this.state.stock)
        let nameProduct = this.inName.value
        let description = this.inDescription.value
        let brand = this.inBrand.value
        let category = this.inCategory.value
        let stock = this.state.stock
        let image = this.state.image
        let price = parseInt(this.inPrice.value)
        console.log({nameProduct, description, brand, stock, image, category, price})

        axios.post(URL_API + '/products', {
            nameProduct, description, brand, stock, image, category, price
        })
            .then(res => {
                console.log(res.data)
                this.props.getDataProduct()
                this.props.btClose()
                alert('Add Data Product Success')
            })
            .catch(err => {
                console.log('ERROR POST :', err)
            })
    }

    onBtnAddStock = () => {
        // let tempStock = [...this.state.stock]
        this.state.stock.push({ id: null, type: null, qty: null })
        this.setState({ stock: this.state.stock })
    }

    printStock = () => {
        if (this.state.stock.length > 0) {
            return this.state.stock.map((item, index) => {
                return <Row>
                    <Col>
                        <Input type="text" placeholder={`Type${index + 1}`} onChange={(e) => this.handleType(e, index)} />
                    </Col>
                    <Col>
                        <Input type="number" min={0} placeholder={`Stock${index + 1}`} onChange={(e) => this.handleStock(e, index)} />
                    </Col>
                    <Col>
                        <a onClick={() => this.onBtnDeleteStock(index)}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }

    onBtnDeleteStock = (index) => {
        this.state.stock.splice(index, 1)
        this.setState({ stock: this.state.stock })
    }

    printImage = () => {
        if (this.state.image.length > 0) {
            return this.state.image.map((item, index) => {
                return <Row>
                    <Col>
                        <Input type="text" placeholder={`Image${index + 1}`} onChange={(e) => this.handleImage(e, index)} />
                    </Col>
                    <Col>
                        <a onClick={() => this.onBtnDeleteImage(index)}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }

    onBtnAddImage = () => {
        this.state.image.push("")
        this.setState({ image: this.state.image })
    }

    onBtnDeleteImage = (index) => {
        this.state.image.splice(index, 1)
        this.setState({ image: this.state.image })
    }

    handleImage = (e, index) => {
        this.state.image[index] = e.target.value
    }

    handleType = (e, index) => {
        this.state.stock[index].type = e.target.value
    }

    handleStock = (e, index) => {
        this.state.stock[index].qty = parseInt(e.target.value)
    }

    onBtnCancel = () => {
        this.setState({ stock: [], image: [] })
        // fungsi untuk close modal
        this.props.btClose()
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.btClose}>
                <ModalHeader toggle={this.props.btClose}>Add Product</ModalHeader>
                <ModalBody>
                    <FormGroup style={{ padding: '2vw' }}>
                        <Label for="textName">Input Nama</Label>
                        <Input type="text" id="textName" innerRef={elemen => this.inName = elemen} />
                    </FormGroup>
                    <FormGroup style={{ padding: '2vw', marginTop: '-6vh' }}>
                        <Label for="textDescription">Description</Label>
                        <Input type="text" id="textDescription" innerRef={elemen => this.inDescription = elemen} />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup style={{ padding: '2vw', marginTop: '-6vh' }}>
                                <Label for="textBrand">Brand</Label>
                                <Input type="text" id="textBrand" innerRef={elemen => this.inBrand = elemen} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup style={{ padding: '2vw', marginTop: '-6vh' }}>
                                <Label for="textCategory">Category</Label>
                                <Input type="text" id="textCategory" innerRef={elemen => this.inCategory = elemen} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup style={{ padding: '2vw', marginTop: '-6vh' }}>
                        <Label className="mr-5">Stock</Label>
                        <Button outline color="success" type='button' size="sm" style={{ float: 'right' }} onClick={this.onBtnAddStock} >Add Stock</Button>
                        {this.printStock()}
                    </FormGroup>
                    <FormGroup style={{ padding: '2vw', marginTop: '-6vh' }}>
                        <Label className="mr-5">Image</Label>
                        <Button outline color="success" type='button' size="sm" style={{ float: 'right' }} onClick={this.onBtnAddImage} >Add Image</Button>
                        {this.printImage()}
                    </FormGroup>
                    <FormGroup style={{ padding: '2vw', marginTop: '-6vh' }}>
                        <Label for="textPrice">Price</Label>
                        <Input type="text" id="textPrice" innerRef={elemen => this.inPrice = elemen} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onBtnAdd}>Submit</Button>{' '}
                    <Button color="secondary" onClick={this.onBtnCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalProduct;


