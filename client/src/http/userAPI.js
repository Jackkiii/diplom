import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, full_name, tel) => {
    const {data} = await $host.post('api/user/registration', {email: email, password: password, role: 'USER', full_name: full_name, tel: tel})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email: email, password: password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const userLogOut = async () => {
    localStorage.clear()
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    console.log('check data',data)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}