import React from 'react';
import { Link } from 'react-router-dom';
import{List, ListInlineItem} from 'reactstrap'

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container-fluid">
                <div className="navbar navbar-expand-lg navbar-light" style={{ justifyContent: 'center', marginTop: '40vh' }}>
                    <h4>Ikuti kami di</h4>
                    <Link className="nav-item facebook mx-1" href="https://www.facebook.com/IKEAindonesia/">
                        <span><img src="https://i.pinimg.com/736x/ac/57/3b/ac573b439cde3dec8ca1c6739ae7f628.jpg" width="50px" /></span>
                    </Link>
                    <Link className="nav-item instagram mx-1" href="https://www.instagram.com/ikea_id/">
                        <span><img src="https://cdn.pixabay.com/photo/2016/09/17/07/03/instagram-1675670_1280.png" width="35px" /></span>
                    </Link>
                    <Link className="nav-item pinterest mx-1" href="https://www.pinterest.com/ikeaindonesia/">
                        <span><img src="https://thumbs.dreamstime.com/b/pinterest-logo-icon-red-social-media-element-vector-white-background-ai-illustrations-139049987.jpg" width="50px" /></span>
                    </Link>
                    <Link className="nav-item twitter" href="https://twitter.com/ikea_ind">
                        <span><img src="https://cms-assets.tutsplus.com/uploads/users/114/posts/26967/image/Twitter-logo.jpg" width="60px" /></span>
                    </Link>
                    <Link className="nav-item youtube mx-1" href="https://www.youtube.com/channel/UCK5-jZtp3K3Vl347vYaffLg">
                        <span><img src="https://static.wikia.nocookie.net/logopedia/images/5/51/Youtube_2013_icon.png" width="40px" /></span>
                    </Link>
                </div>
                <div className='col-12'>
                    <hr style={{ marginTop: '5vh' }}></hr>
                </div>
                <footer className="container py-5">
                    <div style={{ width: '60vw', margin: 'auto' }}>
                        <h4 className="bolder text-center" style={{ justifyContent: 'center' }}>Tautan yang berguna</h4>
                        <ul type="none" className="d-flex m-2" style={{ justifyContent: 'center', fontSize: '14px', lineHeight: '4vh' }}>
                            <List type="inline" className="text-center">
                                <ListInlineItem>Katalog dan Brosur</ListInlineItem>
                                <ListInlineItem className="ml-4">Program perencanaan</ListInlineItem>
                                <ListInlineItem className="ml-4">Layanan Pelanggan</ListInlineItem>
                                <ListInlineItem className="ml-4">IKEA untuk bisnis</ListInlineItem>
                                <ListInlineItem className="ml-4">Hubungi kami</ListInlineItem>
                                <ListInlineItem>Pick-up Point IKEA</ListInlineItem>
                                <ListInlineItem className="ml-4">Ini adalah IKEA</ListInlineItem>
                                <ListInlineItem className="ml-4">Bekerja di IKEA</ListInlineItem>
                                <ListInlineItem className="ml-4">FAQ</ListInlineItem>
                                <ListInlineItem className="ml-4">Ruang Berita</ListInlineItem>
                                <ListInlineItem className="ml-4">Layanan IKEA</ListInlineItem>
                            </List>
                        </ul>
                    </div>
                </footer>
                <div className='col-12'>
                    <hr style={{ marginTop: '1vh' }}></hr>
                </div>
                <footer className="container col-12 py-5">
                    <div className="d-flex">
                        <p className="col-4"><b>© Inter IKEA Systems B.V. 2014 - 2021</b></p>
                        <List type="inline" className="col-8 text-right" style={{ fontSize: '14px' }}>
                            <ListInlineItem className="ml-2"><Link href="">Kebijakan Privasi</Link></ListInlineItem>
                            <ListInlineItem className="ml-2"><Link href="">Pembatasan Tanggung Jawab</Link></ListInlineItem>
                            <ListInlineItem className="ml-2"><Link href="">Pengungkapan yang Bertanggung Jawab</Link></ListInlineItem>
                            <ListInlineItem className="ml-2"><Link href="">Kebijakan Cookie</Link></ListInlineItem>
                        </List>
                    </div>
                </footer>
            </div>
         );
    }
}
 
export default Footer;