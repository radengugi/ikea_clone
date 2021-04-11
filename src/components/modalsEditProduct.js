import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { URL_API } from '../helper'

class ModalEditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: props.detailProduk.stock,
            image: props.detailProduk.image
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
        console.log(nameProduct, description, brand, stock, image, category, price)

        axios.post(URL_API + '/products', {
            nameProduct, description, brand, stock, image, category, price
        })
            .then(res => {
                console.log(res.data)
                // this.setState({ products: res.data })
                this.props.getDataProduct()
                alert('Add Product Success')
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
        let { stock } = this.state
        if (stock) {
            return stock.map((item, index) => {
                return <Row>
                    <Col>
                        <Input type="text" defaultValue={item.type} placeholder={`Type${index + 1}`} onChange={(e) => this.handleType(e, index)} />
                    </Col>
                    <Col>
                        <Input type="number" defaultValue={item.qty} placeholder={`Stock${index + 1}`} onChange={(e) => this.handleStock(e, index)} />
                    </Col>
                    <Col>
                        <a onClick={() => this.onBtnDeleteStock(index)} style={{ cursor: 'pointer' }}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }

    onBtnDeleteStock = (index) => {
        this.props.detailProduk.stock.splice(index, 1)
        this.setState({ stock: this.state.stock })
    }

    printImage = () => {
        let { image } = this.state
        if (image) {
            return image.map((item, index) => {
                return <Row>
                    <Col>
                        <Input type="text" defaultValue={item} placeholder={`Image${index + 1}`} onChange={(e) => this.handleImage(e, index)} />
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
        this.props.detailProduk.image.splice(index, 1)
        this.setState({ image: this.state.image })
    }

    handleImage = (e, index) => {
        this.props.detailProduk.image[index] = e.target.value
    }

    handleType = (e, index) => {
        this.props.detailProduk.stock[index].type = e.target.value
    }

    handleStock = (e, index) => {
        this.props.detailProduk.stock[index].qty = parseInt(e.target.value)
    }

    onBtnCancel = () => {
        // this.setState({ stock: [], image: [] })
        // fungsi untuk close modal
        this.props.btClose()
    }

    onBtnSave = () => {
        let nameProduct = this.inName.value
        let description = this.inDescription.value
        let brand = this.inBrand.value
        let category = this.inCategory.value
        let stock = this.props.detailProduk.stock
        let image = this.props.detailProduk.image
        let price = parseInt(this.inPrice.value)
        console.log({ nameProduct, description, brand, category, stock, image, price })

        axios.patch(URL_API + `/products/${this.props.detailProduk.id}`, {
            nameProduct, description, brand, category, stock, image, price
        })
            .then(res => {
                console.log(res.data)
                this.props.getDataProduct()
                this.props.btClose()
                this.setState({ id: res.data })
                alert('Save Data Success')
            })
            .catch(err => {
                console.log('ERROR SAVE :', err)
            })
    }

    render() {
        // console.log("detailProduk", this.props.detailProduk)
        let { nameProduct, description, category, brand, price } = this.props.detailProduk
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.btClose}>
                <ModalHeader toggle={this.props.btClose}>Edit Product</ModalHeader>
                <ModalBody>
                    <FormGroup style={{ padding: '2vw' }}>
                        <Label for="textName">Input Nama</Label>
                        <Input type="text" id="textName" defaultValue={nameProduct} innerRef={elemen => this.inName = elemen} />
                    </FormGroup>
                    <FormGroup style={{ padding: '2vw', marginTop: '-6vh' }}>
                        <Label for="textDescription">Description</Label>
                        <Input type="text" id="textDescription" defaultValue={description} innerRef={elemen => this.inDescription = elemen} />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup style={{ padding: '2vw', marginTop: '-6vh' }}>
                                <Label for="textBrand">Brand</Label>
                                <Input type="text" id="textBrand" defaultValue={brand} innerRef={elemen => this.inBrand = elemen} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup style={{ padding: '2vw', marginTop: '-6vh' }}>
                                <Label for="textCategory">Category</Label>
                                <Input type="text" id="textCategory" defaultValue={category} innerRef={elemen => this.inCategory = elemen} />
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
                        <Input type="text" id="textPrice" defaultValue={price} innerRef={elemen => this.inPrice = elemen} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="primary" onClick={() => this.onBtnSave(this.state.id)}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.onBtnCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalEditProduct;