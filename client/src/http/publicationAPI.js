import {$authHost} from "./index";

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category)
    return data
}

export const fetchCategories = async () => {
    const {data} = await $authHost.get('api/category')
    return data
}

export const delCategory = async (category) => {
    await $authHost.post('api/category/delete', category)
}

export const createGroup = async (group) => {
    const {data} = await $authHost.post('api/group', group)
    return data
}

export const delGroup = async (group) => {
    await $authHost.post('api/group/delete', group)
}

export const fetchGroups = async () => {
    const {data} = await $authHost.get('api/group')
    return data
}

export const createPublication = async (publication) => {
    const {data} = await $authHost.post('api/publication', publication)
    return data
}

export const fetchPublication = async (name, categoryId, date) => {
    const {data} = await $authHost.get('api/publication', {params: {
        name, categoryId, date
        }})
    return data
}