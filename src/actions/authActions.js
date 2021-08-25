// export const authLogin = (data) => {
//     return {
//         type: "LOGIN_SUCCESS",
//         payload: data
//     }
// }

import axios from "axios"
import { URL_API } from "../helper"

export const authLogin = (inEmail, inPassword) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(URL_API + `/users/login`, {
                email: inEmail, password: inPassword // email berasal dari data backend
            })
            console.log("Cek Login :", res.data)
            if (res.data.idstatus == 11) {
                localStorage.setItem('tkn_id', res.data.token)
                // Jika ingin menjalankan fungsi action lain
                await dispatch(getCart(res.data.iduser))
                await dispatch(getTransaksi(res.data.iduser))
                // Menyimpan data ke reducer
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: { ...res.data }
                })
            } else {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: { idstatus: res.data.idstatus }
                })
            }
        } catch (error) {
            console.log("Error Cuy :",error)
        }
    }
}

export const authLogout = () => {
    localStorage.removeItem('tkn_id')
    return {
        type: "LOGOUT"
    }
}

export const getCart = (iduser) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tkn_id")
            if (token) {
                const headers = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
                let res = await axios.get(URL_API + `/transaction/get-cart/${iduser}`, headers)
                console.log("Cek get cart :",res.data)
                dispatch({
                    type: "UPDATE_CART",
                    payload: res.data
                })
                // return res.data
            }
        } catch (error) {
            console.log(error)
        }

    }
}


// export const keepLogin = (data) => {
//     return {
//         type: "LOGIN_SUCCESS",
//         payload: data
//     }
// }

export const keepLogin = (data) => {
    return async (dispatch) => {
        try {
            localStorage.setItem('tkn_id', data.token)
            await dispatch(getCart(data.iduser))
            await dispatch(getTransaksi(data.iduser))
            // console.log("Cart User 2", cart)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { ...data }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateCart = ({ iduser, qty, idcart }) => {
    // console.log('Cek data update :', iduser, qty, idcart)
    return async dispatch => {
        try {
            // Api update qty cart
            let updateQty = await axios.patch(URL_API + `/transaction/update-qty`, {
                qty, idcart
            })
            // Api get ulang data cart
            await dispatch(getCart(iduser))
            // dispatch({
            //     type: "UPDATE_CART",
            //     payload: cart
            // })
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteCart = (idcart, iduser) => {
    console.log("Cek data delete :", idcart, iduser)
    return async dispatch => {
        try {
            // Api update qty cart
            await axios.delete(URL_API + `/transaction/delete-cart/${idcart}`)
            // Api get ulang data cart
            await dispatch(getCart(iduser))
            // dispatch({
            //     type: "UPDATE_CART",
            //     payload: cart
            // })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getTransaksi = (id) => {
    return async (dispatch) => {
        try {
            id = id > 1 ? id : 1
            let res = await axios.get(URL_API + `/transaction/get-transaksi/${id}`)
            // console.log("Cart Transaksi :", res.data)
            dispatch({
                type: "GET_TRANSACTION",
                payload: res.data
            })
            // return res.data
        } catch (error) {
            console.log(error)
        }
    }
}