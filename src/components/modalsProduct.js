import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { URL_API } from '../helper';
import axios from 'axios'

class ModalProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: [],
            images: [],
            fileName: "Select File",
            fileUpload: null,
            fileSrc: null
        }
    }

    onBtnFile = (e) => {
        if (e.target.files[0]) {
            var reader = new FileReader()
            this.setState({
                fileName: e.target.files[0].name,
                fileUpload: e.target.files[0],
                fileSrc: URL.createObjectURL(e.target.files[0])
            })
        } else {
            this.setState({
                fileName: "Select File",
                fileUpload: null,
                fileSrc: `https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png`
            })
        }
    }


    onBtnAdd = () => {
        console.log(this.state.stock)
        let formData = new FormData()
        let data = {
            nama: this.inName.value,
            brand: this.inBrand.value,
            deskripsi: this.inDescription.value,
            // let category = this.inCategory.value,
            harga: parseInt(this.inPrice.value),
            idstatus: 1,
            // images: this.state.images,
            stock: this.state.stock
            // idcategory: 10
        }

        formData.append('data', JSON.stringify(data))
        formData.append('images', this.state.fileUpload)
        axios.post(URL_API + '/products/add', formData)
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
        if (this.state.images.length > 0) {
            return this.state.images.map((item, index) => {
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
        this.state.images.push("")
        this.setState({ images: this.state.images })
    }

    onBtnDeleteImage = (index) => {
        this.state.images.splice(index, 1)
        this.setState({ images: this.state.images })
    }

    handleImage = (e, index) => {
        this.state.images[index] = e.target.value
    }

    handleType = (e, index) => {
        this.state.stock[index].type = e.target.value
    }

    handleStock = (e, index) => {
        this.state.stock[index].qty = parseInt(e.target.value)
    }

    onBtnCancel = () => {
        this.setState({ stock: [], images: [] })
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
                        {/* <Input type="file" placeholder="Search File" onChange={this.onBtnFile} label={this.state.fileName} /> */}
                        <div className="row">
                            <div className="col-md-6 text-center">
                                {/* <img id="imgpreview" style={{ maxWidth: '95%' }} className="col-8 mx-auto" alt="previ" src={this.state.fileUpload ? URL.createObjectURL(this.state.fileUpload) : "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"} /> */}
                                {this.state.fileSrc == null ? (
                                    <>
                                        <img src="https://portal.bimakota.go.id/upload/not_image.png" width="150px" height="auto" />
                                    </>
                                ) : (
                                    <>
                                        <img src={this.state.fileSrc} width="150px" height="auto" />
                                    </>
                                )}
                                &nbsp;
                            </div>
                            <div className="col-md-6 py-5">
                                <Input type="file" label={this.state.fileName} onChange={this.onBtnFile}></Input>
                            </div>
                        </div>

                        {/* <Button outline color="success" type='button' size="sm" style={{ float: 'right' }} onClick={this.onBtnAddImage} >Add Image</Button> */}
                        {/* {this.printImage()} */}
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


