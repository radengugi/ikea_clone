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
        return this.state.data.map((item, index) => {
            return <div className="col-md-3 my-2">
                <Card>
                    <Link to={`/product-detail?id=${item.id}`} style={{textDecoration: 'none', color:'black'}}>
                        <CardImg top width="100%" src={item.image[0]} alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5" style={{ fontWeight: 'bolder' }}>{item.nameProduct} </CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{item.category}</CardSubtitle>
                            <CardText tag="h5" style={{ fontWeight: 'bolder' }}>Rp {item.price.toLocaleString()}</CardText>
                            <Button type="button" outline style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span class="material-icons">
                                    visibility
                                </span>
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
        let field = this.sort.value.split('-')[0]
        let sortType = this.sort.value.split('-')[1]
        let tempData = [...this.props.products] // duplicate data dari reducer ke variabel tempData
        if (sortType == 'asc') {
            let dataAsc = tempData.sort((a, b) => {
                return a[field] - b[field] // b[field] sama dengan b.field
            })
            console.log(dataAsc)
            this.setState({ data: dataAsc })
            // this.props.sortProducts(dataAsc)
        } else if (sortType == 'desc') {
            let dataDesc = tempData.sort((a, b) => {
                return b[field] - a[field]
            })
            console.log(dataDesc)
            this.setState({ data: dataDesc })
            // this.props.sortProducts(dataDesc)
        }
    }

    render() {
        return (
            <div className='container column my-5'>
                <Input type='select' style={{ width: '15vw', float: 'right', marginRight: '0.5vw' }} onChange={this.sortReducer} innerRef={elemen => this.sort = elemen}>
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

const mapToProps = ({ productReducers }) => {
    return {
        products: productReducers.products_list,
        productsList: productReducers.products_sort
    }
}

export default connect(mapToProps, { getProductAction, sortProducts })(ProductsPage);