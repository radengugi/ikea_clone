import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Jumbotron, Button, Input, Alert } from 'reactstrap';
import { URL_API } from '../helper';
import { authLogin } from '../actions'

// class VerificationPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             otp: '',
//             alert: false,
//             message: '',
//             alertType: ''
//         }
//     }

//     btnVerified = () => {
//         axios.patch(URL_API + `/users/update-verified/${this.otp.value}`)
//             .then(res => {
//                 console.log("Cek Verified :", res.data)
//                 this.setState({ otp: res.data })
//                 setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
//                 this.setState({ alert: !this.state.alert, message: 'Verification Success', alertType: 'success' })
//             }).catch(err => {
//                 console.log("Error cuy :", err)
//             })
//     }

//     render() {
//         return (
//             <div className="container text-center">
//                 <Alert isOpen={this.state.alert} color={this.state.alertType}>
//                     {this.state.message}
//                 </Alert>
//                 <Jumbotron>
//                     <h1 className="display-3" style={{ fontSize: '50px' }}>Hello, Please Verification your Email Address</h1>
//                     <p className="lead">Type your OTP</p>
//                     <Input style={{ width: '30%', position: 'relative', left: '28vw' }} type="text" innerRef={elemen => this.otp = elemen} />
//                     <hr className="my-2" />
//                     <p className="lead">
//                         <Button onClick={this.btnVerified} className="my-3" color="primary">Verification Account</Button>
//                     </p>
//                 </Jumbotron>
//             </div>
//         );
//     }
// }

// const mapToProps = ({ authReducer }) => {
//     return {
//         ...authReducer
//     }
// }

// export default connect(mapToProps)(VerificationPage);

const VerificationPage = (props) => {

    // Cek token
    // console.log(props.location.pathname.split('/')[2])
    const [otp, setOTP] = useState('')

    const btnVerified = async () => {
        try {
            const headers = {
                headers: {
                    "Authorization": `Bearer ${props.location.pathname.split('/')[2]}`
                }
            }
            let res = await axios.patch(URL_API + `/users/update-verified`, {
                otp: otp.value
            }, headers)

            // alert(res.data.message)
            alert("Verification Account Success !")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container text-center">
            <Jumbotron>
                <h1 className="display-3" style={{ fontSize: '50px' }}>Hello, Please Verification your Email Address</h1>
                <p className="lead">Type your OTP</p>
                <Input style={{ width: '30%', position: 'relative', left: '28vw' }} type="text" innerRef={(e) => setOTP(e)} />
                <hr className="my-2" />
                <p className="lead">
                    <Button onClick={btnVerified} className="my-3" color="primary">Verification Account</Button>
                </p>
            </Jumbotron>
        </div>
    )
}

export default VerificationPage