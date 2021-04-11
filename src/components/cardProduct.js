import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { connect } from 'react-redux'

class CardProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    printCard = () => {
        if (this.props.products.length > 0) {
            return this.props.products.map((item, index) => {
                return <div className="col-md-3 my-2">
                    <Card>
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
                    </Card>
                </div>
            })
        }
    }



    render() {
        // let { nameProduct, category, image, brand, price } = this.props.dataProduct
        return (
            <div className="container py-5" style={{width:'80vw'}}>
                <h4 className="container text-center">Produk Pilihan</h4>
                <div id="carouselExampleIndicators" className="carousel slide py-3" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="row carousel-inner text-center" >
                        {this.printCard()}
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}

const mapToProps = ({ productReducers }) => {
    return {
        products: productReducers.products_list
    }
}

export default connect(mapToProps)(CardProduct);