// import React from 'react';
// import { Editor } from 'primereact/editor';
// import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';

// class NewsPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             judul: '',
//             deskripsi: '',
//             fileName: "Select File",
//             fileUpload: null,
//             fileSrc: null,
//             selectedCity1: null
//         }

//         this.cities = [
//             { name: 'New York', code: 'NY' },
//             { name: 'Rome', code: 'RM' },
//             { name: 'London', code: 'LDN' },
//             { name: 'Istanbul', code: 'IST' },
//             { name: 'Paris', code: 'PRS' }
//         ];

//         this.onCityChange = this.onCityChange.bind(this);
//     }

//     onCityChange(e) {
//         this.setState({ selectedCity1: e.value });
//     }

//     header = () => {
//         return (
//             <span className="ql-formats">
//                 <button className="ql-bold" aria-label="Bold"></button>
//                 <button className="ql-italic" aria-label="Italic"></button>
//                 <button className="ql-underline" aria-label="Underline"></button>
//             </span>
//         )
//     }

//     onBtnFile = (e) => {
//         if (e.target.files[0]) {
//             var reader = new FileReader()
//             this.setState({
//                 fileName: e.target.files[0].name,
//                 fileUpload: e.target.files[0],
//                 fileSrc: URL.createObjectURL(e.target.files[0])
//             })
//         } else {
//             this.setState({
//                 fileName: "Select File",
//                 fileUpload: null,
//                 fileSrc: `https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png`
//             })
//         }
//     }

//     render() {
//         let header = this.header()
//         return (
//             <div className="container">
//                 <div className="p-grid p-formgrid p-fluid">
//                     <h2 className="text-center my-5">Create News</h2>
//                     <div className="p-col-12 p-mb-2 p-lg-4 p-mb-lg-0" style={{ alignItems: 'center', margin: 'auto' }}>
//                         <div className="p-field p-fluid mb-5">
//                             <h6>Judul</h6>
//                             <InputText id="email" type="email" aria-describedby="username-help" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
//                             <small id="username-help" style={{ float: 'right', color: 'red', fontSize: '12px' }}>*Required</small>
//                         </div>
//                         <div className="card" style={{ border: 'none' }}>
//                             <h6>Deskripsi</h6>
//                             <Editor style={{ height: '320px' }} value={this.state.text1} onTextChange={(e) => this.setState({ text1: e.htmlValue })} />
//                         </div>
//                         <small id="username-help" style={{ float: 'right', color: 'red', fontSize: '12px' }}>*Required</small>
//                         <div className="mt-5">
//                             {/* <Input type="file" placeholder="Search File" onChange={this.onBtnFile} label={this.state.fileName} /> */}
//                             <div className="row">
//                                 <div className="col-md-6 text-center">
//                                     {/* <img id="imgpreview" style={{ maxWidth: '95%' }} className="col-8 mx-auto" alt="previ" src={this.state.fileUpload ? URL.createObjectURL(this.state.fileUpload) : "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"} /> */}
//                                     {this.state.fileSrc == null ? (
//                                         <>
//                                             <img src="https://portal.bimakota.go.id/upload/not_image.png" width="300em" height="auto" />
//                                         </>
//                                     ) : (
//                                         <>
//                                             <img src={this.state.fileSrc} width="150px" height="auto" />
//                                         </>
//                                     )}
//                                     &nbsp;
//                                 </div>
//                                 <div className="col-md-6 py-5">
//                                     <InputText type="file" label={this.state.fileName} onChange={this.onBtnFile} style={{ border: 'none' }}></InputText>
//                                 </div>
//                             </div>
//                         </div>
//                         <div>
//                             <h5>Kategori</h5>
//                             <Dropdown value={this.state.selectedCity1} options={this.cities} onChange={this.onCityChange} optionLabel="name" placeholder="Select a City" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default NewsPage;


// import React from 'react';
// import axios from 'axios';
// import { URL_API } from '../helper';
// import { connect } from 'react-redux';
// import { authLogin } from '../action/authAction'
// import { Redirect } from 'react-router-dom'
// import { Password } from 'primereact/password';
// import { Divider } from 'primereact/divider';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Messages } from 'primereact/messages';

// class LoginPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//             redirect: true
//         }
//         this.onBtnLogin = this.onBtnLogin.bind(this);
//     }

//     onBtnLogin = () => {
//         // console.log("Cek data :",this.props.users)
//         // this.props.authLogin(this.state.email, this.state.password)
//         axios.post(URL_API + `/users/login`, {
//             email: this.state.email,
//             password: this.state.password
//         })
//             .then(res => {
//                 if (res.data.idstatus == 1) {
//                     this.props.authLogin(res.data)
//                     localStorage.setItem('tkn_id', res.data.token)
//                     // this.setState({ redirect: true })
//                     this.toast.show({ severity: 'success', detail: 'Login Success', life: 3000 })
//                     console.log("Login Success", res.data)
//                 } else {
//                     this.toast.show({ severity: 'error', detail: 'Account Not Verified, Please Check Your Email !', life: 3000 })
//                 }
//             })
//             .catch(err => {
//                 console.log("Error Login", err)
//             })
//     }

//     render() {
//         let header = <h6>Pick a password</h6>;
//         let footer = (
//             <React.Fragment>
//                 <Divider />
//                 <p className="p-mt-2">Suggestions</p>
//                 <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
//                     <li>At least one lowercase</li>
//                     <li>At least one uppercase</li>
//                     <li>At least one numeric</li>
//                     <li>Minimum 6 characters</li>
//                 </ul>
//             </React.Fragment>
//         );
        
//         // if (this.state.redirect) {
//         //     return <Redirect to="/" />
//         // }
//         if (this.props.id && this.props.idstatus == 1) {
//             return <Redirect to="/" />
//         }
//         return (
//             <div className="bg-img">
//                 <div className="container">
//                     <h1 className="text-center mb-5">Login Page</h1>
//                     <Messages ref={(el) => this.toast = el} style={{ width: '30rem', margin: 'auto' }} />
//                     <div className="p-field p-fluid my-4" style={{ width: '30rem', margin: 'auto' }}>
//                         <h6>Email</h6>
//                         <InputText id="email" type="email" aria-describedby="username-help" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
//                     </div>
//                     <div className="card my-4" style={{ width: '30rem', background: 'none', margin: 'auto', border: 'none' }}>
//                         <h6>Password</h6>
//                         <Password value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} toggleMask />
//                     </div>
//                     <div style={{ width: '30rem', margin: 'auto' }}>
//                         <Button onClick={this.onBtnLogin} style={{ width: '30rem' }} label="Sign In" className="p-button-rounded" />
//                     </div>
//                 </div>
//             </div >
//         );
//     }
// }

// const mapToProps = ({ authReducer }) => {
//     return {
//         id: authReducer.iduser,
//         idstatus: authReducer.idstatus
//     }
// }

// export default connect(mapToProps, { authLogin })(LoginPage);