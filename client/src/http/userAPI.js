import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, full_name, tel, group) => {
    const {data} = await $host.post('api/user/registration', {email: email, password: password, role: 'USER', full_name: full_name, tel: tel, groupId: group})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const registrationAdmin = async (login, password) => {
    const {data} = await $authHost.post('api/user/registration-admin', {email: login, password: password, role: 'ADMIN'})
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

export const delGroup = async (group) => {
    await $authHost.post('api/group/delete', group)
}

export const fetchGroups = async () => {
    const {data} = await $authHost.get('api/group')
    return data
}

export const fetchOneGroup = async (id) => {
    const {data} = await $authHost.get('api/group/' + id)
    return data
}

export const fetchListUsersByGroup = async (groupId) => {
    const {data} = await $authHost.get('api/user/' + groupId)
    return data
}
