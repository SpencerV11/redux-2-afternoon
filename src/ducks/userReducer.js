import axios from 'axios'

let initialState = {
    email: null,
    firstName: null,
    lastName: null
}

const REQUEST_USER_DATA = 'REQUEST_USER_DATA'

export function requestUserData() {
    let data = axios.get('/auth/user-data').then(res => {
        return res.data
    })

    return {
        type: REQUEST_USER_DATA,
        payload: data
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case REQUEST_USER_DATA + '_FULFILLED':
        // const { email, firstName, lastName } = action.payload.user
        //     return {email, firstName, lastName}
        return {...state, email: action.payload.user.email, firstName: action.payload.user.firstName, lastName: action.payload.user.lastName}
        default: return state
    }
}