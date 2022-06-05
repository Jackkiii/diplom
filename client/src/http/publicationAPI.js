import {$authHost} from "./index";

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category)
    return data
}

export const fetchCategories = async () => {
    const {data} = await $authHost.get('api/category')
    return data
}

export const fetchOneCategories = async (id) => {
    const {data} = await $authHost.get('api/category/' + id)
    return data
}

export const delCategory = async (category) => {
    await $authHost.post('api/category/delete', category)
}

export const createGroup = async (group) => {
    const {data} = await $authHost.post('api/group', group)
    return data
}

export const createPublication = async (publication) => {
    const {data} = await $authHost.post('api/publication', publication)
    return data
}

export const fetchPublication = async (name, categoryId, date, groupId, page, limit = 4) => {
    const {data} = await $authHost.get('api/publication', {params: {
        name, categoryId, date, groupId, page, limit
        }})
    return data
}

export const fetchPublicationListUserId = async (userId) => {
    const {data} = await $authHost.get('api/publication/user/' + userId)
    return data
}

export const fetchPublicationFile = async (file) => {
    const response = await fetch(`http://localhost:5000/api/publication/download/${file}`)

    console.log(response)
    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = file
    document.body.appendChild(link)
    link.click()
    link.remove()
    console.log(link)
}