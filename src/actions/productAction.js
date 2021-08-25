// redux default
// export const getProductAction = (data) => {
//     return {
//         type: "GET_PRODUCTS",
//         payload: data
//     }
// }

import axios from "axios"
import { URL_API } from "../helper"

// redux-thunk
export const getProductAction = () => {
    return (dispatch) => {
        axios.get(URL_API + `/products/get-data`)
            .then(res => {
                console.log("Cek Product :",res.data)
                // mengarahkan data ke reducer
                dispatch({
                    type: "GET_PRODUCTS",
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const sortProducts = (data) => {
    return {
        type: "SORT_PRODUCTS",
        payload: data
    }
}