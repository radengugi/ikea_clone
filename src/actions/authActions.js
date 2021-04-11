// export const authLogin = (data) => {
//     return {
//         type: "LOGIN_SUCCESS",
//         payload: data
//     }
// }

import axios from "axios"
import { URL_API } from "../helper"

export const authLogin = (inEmail, inPassword) => {
    return (dispatch) => {
        // Fungsi untuk get data ke API
        axios.get(URL_API + `/users?email=${inEmail}&password=${inPassword}`)
            .then(res => {
                if (res.data.length > 0) {
                    // Menyimpan data ke reducer
                    dispatch({ type: "LOGIN_SUCCESS", payload: res.data[0] })
                    localStorage.setItem('tkn_id', res.data[0].id)
                } else {
                    this.setState({ alert: !this.state.alert, message: 'Akun tidak ditemukan', alertType: 'warning' })
                }
            })
            .catch(err => {
                console.log('Login Error :', err)
            })
    }
}

export const authLogout = () => {
    localStorage.removeItem('tkn_id')
    return {
        type: "LOGOUT"
    }
}


// export const keepLogin = (data) => {
//     return {
//         type: "LOGIN_SUCCESS",
//         payload: data
//     }
// }

export const keepLogin = () => {
    let idToken = localStorage.getItem("tkn_id")
    return (dispatch) => {
        axios.get(URL_API + `/users?id=${idToken}`)
            .then(res => {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data[0] })
            })
            .catch(err => {
                console.log("Keep Login Error :", err)
            })
    }
}

export const updateCart = (data) => {
    console.log('cart :', data)
    return {
        type: "UPDATE_CART",
        payload: data
    }
}