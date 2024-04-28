import axios from "../axiosConfig";


export const apiGetAllUser = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/user/get-all-user',
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiCreateNewUser = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: `/api/v1/user/create-user`,
            data: payload,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetCurrent = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/user/get-current',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateUser = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'put',
            url: '/api/v1/user/',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateUserData = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'put',
            url: `/api/v1/user/update-user`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiDeleteUser = (userId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `/api/v1/user/delete-user`,
            params: { userId }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})