import {$authHost} from "./index";

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category)
    return data
}

export const fetchCategories = async () => {
    const {data} = await $authHost.get('api/category')
    return data
}

export const createGroup = async (group) => {
    const {data} = await $authHost.post('api/group', group)
    return data
}

export const fetchGroups = async (name) => {
    const {data} = await $authHost.get('api/group')
    return data
}