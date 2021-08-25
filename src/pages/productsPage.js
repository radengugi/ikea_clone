import React from 'react';
// import CardProduct from '../components/cardProduct';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Input } from 'reactstrap';
import { connect } from 'react-redux'
import axios from 'axios';
import { URL_API } from '../helper';
import { getProductAction, sortProducts } from '../actions'
import { Link } from 'react-router-dom'

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.products,
            key: true
        }
    }

    // untuk menjalankan fungsi ketika ada perubahan data pada state dan juga props
    componentDidUpdate() {
        if (this.props.products.length > 0 && this.state.key) {
            this.setState({ data: this.props.products, key: false })
        }
    }

    printProducts = () => {
        // if (this.props.productsList.length > 0) {
        // console.log("Cek Data :", this.state.data)
        return this.state.data.map((item, index) => {
            return <div className="col-md-3 my-2 product-page">
                <Card className="card">
                    <Link to={`/products-detail?idproducts=${item.idproducts}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <CardImg className="card-img" top width="100%" src={item.images[0].images} alt="product-image"/>
                        <CardBody className="card-body">
                            <CardTitle tag="h5" className="card-title">{item.nama} </CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted card-subtitle">{item.deskripsi}</CardSubtitle>
                            <CardText tag="h5" className="card-text">Rp {item.harga.toLocaleString()}</CardText>
                            <Button className="btn-sekilas" type="button" outline>
                                <span className="material-icons">visibility</span>
                                <span>Lihat Sekilas</span>
                            </Button>
                        </CardBody>
                    </Link>
                </Card>
            </div>
        })
        // }
    }

    // Cara 1 : Ambil data dari json-server
    handleProduct = () => {
        let field = this.sort.value.split('-')[0]
        let sortType = this.sort.value.split('-')[1]
        axios.get(URL_API + `/products?_sort=${field}&_order=${sortType}`)
            .then(res => {
                console.log(field, sortType, res.data)
                this.props.getProductAction()
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Cara 2 : sort dari data reducer
    sortReducer = () => {
        let field = this.sortField.value.split('-')[0]
        let sortType = this.sortField.value.split('-')[1]
        let tempData = [...this.props.products] // duplicate data dari reducer ke variabel tempData
        if (sortType == 'asc') {
            let dataAsc = tempData.sort((a, b) => {
                return a[field] - b[field] // b[field] sama dengan b.field
            })
            console.log("Data Ascending :",dataAsc)
            this.setState({ data: dataAsc })
            // this.props.sortProducts(dataAsc)
        } else if (sortType == 'desc') {
            let dataDesc = tempData.sort((a, b) => {
                return b[field] - a[field]
            })
            console.log("Data Descending :",dataDesc)
            this.setState({ data: dataDesc })
            // this.props.sortProducts(dataDesc)
        }
    }

    render() {
        return (
            <div className='container column my-5'>
                <Input type='select' style={{ width: '15vw', float: 'right', marginRight: '2.2vw', marginBottom:'4vh' }} onChange={this.sortReducer} innerRef={elemen => this.sortField = elemen}>
                    <option value="nameProduct-asc">A-Z</option>
                    <option value="nameProduct-desc">Z-A</option>
                    <option value="price-asc">Harga Asc</option>
                    <option value="price-desc">Harga Desc</option>
                    <option value="id-asc">Reset</option>
                </Input>
                <div className="container row text-center" style={{ margin: 'auto', marginTop: '2vh' }}>
                    {this.printProducts()}
                </div>
            </div>
        );
    }
}

const mapToProps = ({ productReducers}) => {
    return {
        products: productReducers.products_list,
        productsList: productReducers.products_sort
    }
}

export default connect(mapToProps, { getProductAction, sortProducts })(ProductsPage);