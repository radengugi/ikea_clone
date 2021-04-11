import axios from 'axios';
import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Footer from './components/footer';
import NavbarComp from './components/navbar'
import { URL_API } from './helper';
import LandingPage from './pages/landingPage'
import LoginPage from './pages/loginPage';
import { keepLogin, getProductAction } from './actions'
import { connect } from 'react-redux'
import ProductManagement from './pages/productManagement';
import NotFound from './pages/notFound';
import ProductsPage from './pages/productsPage';
import ProductDetail from './pages/productDetail';
import CartPage from './pages/cartPage';
import HistoryUser from './pages/historyUser';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    this.reLogin()
    // this.getProducts()
    this.props.getProductAction()
  }

  reLogin = () => {
    this.props.keepLogin()
    // let idToken = localStorage.getItem("tkn_id")
    // axios.get(URL_API + `/users?id=${idToken}`)
    //   .then(res => {
    //     // this.props.keepLogin(res.data[0])
    //     this.props.keepLogin()
    //   })
    //   .catch(err => {
    //     console.log("Keep Login Error :", err)
    //   })
  }

  // getProducts = () => {
  //   axios.get(URL_API + `/products`)
  //     .then(res => {
  //       this.props.getProductAction(res.data)
  //     })
  //     .catch(err => {
  //       console.log("getProduct error :", err)
  //     })
  // }

  render() {
    return (
      <div>
        <NavbarComp />
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/product-detail" component={ProductDetail} />
          <Route path="/cart" component={CartPage} />
          <Route path="/history-user" component={HistoryUser} />
          {
            this.props.role == "admin" &&
            <>
              <Route path="/product-management" component={ProductManagement} />
            </>
          }
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

// inline condition
// 1. condition ? return true : return false, sama dg kita membuat if(condition){} else{}
// 2. condition && return, sama dg kita membuat if(condition){}

const mapStateToProps = ({ authReducer }) => {
  return {
    role: authReducer.role
  }
}

export default connect(mapStateToProps, { keepLogin, getProductAction })(App);
