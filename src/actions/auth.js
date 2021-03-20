import Swal from "sweetalert2";
import { fetchSinToken, fetchToken } from "../helpers/fetch";
import { types } from "../types/types";


export const authStartLogin = (email, password) => {
    return async (dispatch) => {
        const response = await fetchSinToken('auth/login', {email, password}, 'POST');
        const body = await response.json();
        
        if(body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
     
            dispatch(login(body.user))

        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const authStartRegister = (email, password, name) => {
    return async (dispatch) => {
        const response = await fetchSinToken('auth/new', {email, password, name}, 'POST');
        const body = await response.json();
        
        if(body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
     
            dispatch(login(body.user))

        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const authStartChecking = () => {
    return async (dispatch) => {
        const response = await fetchToken('auth/renew');
        const body = await response.json();
        
        if(body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

     
            dispatch(login(body.user))

        } else {
            dispatch(authCheckingFinish());
        }
    }
}

const authCheckingFinish = () => ({
    type: types.authCheckingFinish
})

const login = user => ({
    type: types.authLogin,
    payload: user
})

export const authStartLogout = () => {
    return dispatch => {
        localStorage.clear();
        dispatch(logout());
    }
}

const logout = () => ({
    type: types.authLogout
})