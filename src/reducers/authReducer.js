const INITIAL_STATE = {
    iduser: null,
    username: '',
    email: '',
    role: '',
    cart: [],
    transaction: []
}

export const authReducer = (state = INITIAL_STATE, action) => {
    // console.log("Data user reducer :", action.payload)
    switch (action.type) {
        case "LOGIN_SUCCESS":
            delete action.payload.password
            return { ...state, ...action.payload }
        case "UPDATE_CART":
            console.log('reducer update :', action.payload)
            return { ...state, cart: action.payload }
        case "GET_TRANSACTION":
            // console.log('reducer :', action.payload)
            return { ...state, transaction: action.payload }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}