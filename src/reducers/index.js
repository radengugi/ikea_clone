import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { productReducers } from './productReducer'
import { transactionReducer } from './transactionReducer'

export const Reducers = combineReducers({
    authReducer,
    productReducers,
    transactionReducer
})