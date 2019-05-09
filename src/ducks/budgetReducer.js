import axios from 'axios'

let initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}
const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
const ADD_PURCHASE = 'ADD_PURCHASE'
const DELETE_ITEM = 'DELETE_ITEM'

export function deleteItem(id) {
    let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res => {
        return res.data
    })
    return {
        type: DELETE_ITEM,
        payload: data
    }
}

export function addPurchase(price, description, category) {
    let data = axios.post('/api/budget-data/purchase', {description, price, category}).then(res => {
        return res.data
    })
    return {
        type: ADD_PURCHASE,
        payload: data
    }
}

export function requestBudgetData() {
    let data = axios.get('/api/budget-data').then(res => {
        return res.data
    })
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case REQUEST_BUDGET_DATA + '_PENDING':
            return {...state, loading: true}
        case REQUEST_BUDGET_DATA + '_FULFILLED':
            return {...state, loading: false, ...action.payload}
        case ADD_PURCHASE + '_PENDING':
            return {...state, loading: true}
        case ADD_PURCHASE + '_FULFILLED':
            return {...state, purchases: action.payload, loading: false}
        case DELETE_ITEM + '_PENDING':
            return {...state, loading: true}
        case DELETE_ITEM + '_FULFILLED':
            return {...state, purchases: action.payload, loading: false}
        default: return state
    }
}