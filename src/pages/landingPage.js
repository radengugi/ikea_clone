import React from 'react';
import { Container, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Input } from 'reactstrap';
import CarouselComp from '../components/carousel';
import { connect } from 'react-redux'
import Slider from "react-slick";
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    printProducts = () => {
        // console.log("Cek Image :", this.props.products)
        if (this.props.products.length > 0) {
            return this.props.products.map((item, index) => {
                return <div className="home-product">
                    <Card>
                        <CardImg top width="100%" src={item.images[0].images} alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5" style={{ fontWeight: 'bolder' }}>{item.nama} </CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{item.brand}</CardSubtitle>
                            {/* <CardText tag="h5" style={{ fontWeight: 'bolder',color:'black' }}>{item.deskripsi}</CardText> */}
                            <CardText tag="h5" style={{ fontWeight: 'bolder' }}>Rp {item.harga.toLocaleString()}</CardText>
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
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4
        }

        const settings2 = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3
        };
        return (
            <Container fluid>
                <CarouselComp />
                <div className="container slider-carousel">
                    <h2 className="text-center my-5">Produk Pilihan</h2>
                    <Slider {...settings}>
                        {this.printProducts()}
                    </Slider>
                </div>
                <div>
                    <h2 className="text-center my-5">Ide dan Inspirasi Lainnya</h2>
                    <div className="row">
                        <div className="col-md-8" style={{ height: '100%' }}>
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1627966102__0.jpeg" style={{ width: '100%', height: '55vh' }} />
                            <p>Biarkan anak remaja Anda berkreasi dengan kamarnya. Kami menyediakan bantal kamar tidur hingga dekorasi berupa bingkai dinding agar mereka dapat menciptakan kombinasi yang sesuai dengan kepribadian. <Link>Lihat lebih banyak</Link></p>
                        </div>
                        <div className="col-md-4" style={{ height: 'auto' }}>
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1625834238__1.jpeg" style={{ width: '100%', height: '55vh' }} />
                            <p>Buat perubahan sederhana untuk menyambut anak-anak memasuki tahun ajaran baru. <Link>Cek di sini</Link></p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-center my-5">Telusuri koleksi kami</h2>
                    <div className="column telusuri" style={{ width: '90%', margin: 'auto' }}>
                        <Slider {...settings2}>
                            <div className="card col-md-12 col-4">
                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1627900160_0_0.jpeg" className="card-img-top" alt="..." />
                                <div className="card-body" style={{ backgroundColor: '#b54834' }}>
                                    <h5 className="card-title">HÖSTKVÄLL</h5>
                                    <p className="card-text">Tekstil, dekorasi dan peralatan makan dalam warna dan motif musim gugur ini menghadirkan suasana hangat dan santai ke dalam rumah Anda.</p>
                                    <a href="#" className="btn btn-primary"><span class="material-icons">arrow_forward</span></a>
                                </div>
                            </div>
                            <div className="card col-md-12 col-4">
                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1625211503__0.jpeg" className="card-img-top" alt="..." />
                                <div className="card-body" style={{ backgroundColor: '#6ccb3f' }}>
                                    <h5 className="card-title">EFTERTRÄDA</h5>
                                    <p className="card-text">Koleksi fashion yang terinspirasi dari dan didesain untuk, para penggemar IKEA di seluruh dunia. Lihat koleksi lengkapnya.</p>
                                    <a href="#" className="btn btn-primary"><span class="material-icons">arrow_forward</span></a>
                                </div>
                            </div>
                            <div className="card col-md-12 col-4">
                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1621851772__0.jpeg" className="card-img-top" alt="..." />
                                <div className="card-body" style={{ backgroundColor: '#469bc3' }}>
                                    <h5 className="card-title">BYGGLEK</h5>
                                    <p className="card-text">Kami percaya bahwa bermain dapat membuat hidup jadi jauh lebih menyenangkan. Hal inilah yang meyakinkan kami untuk mengembangkan BYGGLEK. Lihat koleksi lengkapnya.</p>
                                    <a href="#" className="btn btn-primary"><span class="material-icons">arrow_forward</span></a>
                                </div>
                            </div>
                            <div className="card col-md-12 col-4">
                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1614784257__0.jpeg" className="card-img-top" alt="..." />
                                <div className="card-body" style={{ backgroundColor: '#948a7e' }}>
                                    <h5 className="card-title">HAUGA</h5>
                                    <p className="card-text">Desain yang dirancang sedemikian rupa membuat setiap produk berpadu sempurna saat digabungkan, seakan dibuat khusus untuk rumah Anda.</p>
                                    <a href="#" className="btn btn-primary"><span class="material-icons">arrow_forward</span></a>
                                </div>
                            </div>
                            <div className="card col-md-12 col-4">
                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1614784257__2.jpeg" className="card-img-top" alt="..." />
                                <div className="card-body" style={{ backgroundColor: '#78878f' }}>
                                    <h5 className="card-title">SMÅSTAD</h5>
                                    <p className="card-text">Perabot penyimpanan modular ini mengajak si kecil untuk bermain, belajar dan mengasah kreativitas melalui kegiatan sehari-hari.</p>
                                    <a href="#" className="btn btn-primary"><span class="material-icons">arrow_forward</span></a>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
                <div>
                    <h2 className="text-center my-5">Penawaran Terkini</h2>
                    <div className="row list-offer m-auto w-40" style={{ width: '90%', margin: 'auto' }}>
                        <div className="card col-md-4">
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1627879221_0_0.jpeg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Promo Kredivo</h5>
                                {/* <p className="card-text">Tekstil, dekorasi dan peralatan makan dalam warna dan motif musim gugur ini menghadirkan suasana hangat dan santai ke dalam rumah Anda.</p> */}
                                <a href="#" className="btn btn-primary"><span class="material-icons">arrow_forward</span></a>
                            </div>
                        </div>
                        <div className="card col-md-4">
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1627749619_0_0.jpeg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Bank Offer</h5>
                                {/* <p className="card-text">Koleksi fashion yang terinspirasi dari dan didesain untuk, para penggemar IKEA di seluruh dunia. Lihat koleksi lengkapnya.</p> */}
                                <a href="#" className="btn btn-primary"><span class="material-icons">arrow_forward</span></a>
                            </div>
                        </div>
                        <div className="card col-md-4">
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1620011866__1.jpeg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Indomaret Pick Up Point</h5>
                                {/* <p className="card-text">Kami percaya bahwa bermain dapat membuat hidup jadi jauh lebih menyenangkan. Hal inilah yang meyakinkan kami untuk mengembangkan BYGGLEK. Lihat koleksi lengkapnya.</p> */}
                                <a href="#" className="btn btn-primary"><span class="material-icons">arrow_forward</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-around head-convenience">
                    <div className="convenience"><span className="material-icons my-2">home_repair_service</span>Layanan Penataan Rumah</div>
                    <div className="convenience"><span className="material-icons my-2">local_shipping</span>Pengantaran</div>
                    <div className="convenience"><span className="material-icons my-2">construction</span>Perakitan</div>
                    <div className="convenience"><span className="material-icons my-2">credit_card</span>Pembiayaan</div>
                    <div className="convenience"><span className="material-icons my-2">replay_30</span>Kebijakan Pengembalian</div>
                    <div className="convenience"><span className="material-icons my-2">shopping_bag</span>Cara Berbelanja di IKEA</div>
                    <div className="convenience"><span className="material-icons my-2">help_outline</span>FAQ</div>
                    <div className="convenience"><span className="material-icons my-2">phone_in_talk</span>Hubungi Kami</div>
                </div>
            </Container>
        );
    }
}

const mapToProps = ({ productReducers }) => {
    return {
        products: productReducers.products_list
    }
}

export default connect(mapToProps)(LandingPage);