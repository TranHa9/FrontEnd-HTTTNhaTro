import axiosConfig from "../axiosConfig";
import axiosDefault from 'axios';

// export const apiGetPrices = () => new Promise(async (resolve, reject) => {
//     try {
//         const response = await axios({
//             method: 'get',
//             url: 'api/v1/price/all'
//         })
//         resolve(response)
//     } catch (error) {
//         reject(error)
//     }
// })
// export const apiGetAreas = () => new Promise(async (resolve, reject) => {
//     try {
//         const response = await axios({
//             method: 'get',
//             url: 'api/v1/area/all'
//         })
//         resolve(response)
//     } catch (error) {
//         reject(error)
//     }
// })

// export const apiGetProvince = () => new Promise(async (resolve, reject) => {
//     try {
//         const response = await axios({
//             method: 'get',
//             url: 'api/v1/province/all'
//         })
//         resolve(response)
//     } catch (error) {
//         reject(error)
//     }
// })

export const apiGetCategories = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/category/all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetCategoriesLimit = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/category/all-limit',
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiCreateCategory = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/category/create-category`,
            data: payload,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateCategoryData = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/category/update-category`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiDeleteCategory = (categoryId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/category/delete-category`,
            params: { categoryId }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPublicProvince = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: 'http://localhost:8080/api/tinh-tp'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetPublicDistrict = (provinceId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: `http://localhost:8080/api/tinh-tp/quan-huyen/${provinceId}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetPublicWard = (districtId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: `http://localhost:8080/api/quan-huyen/xa-phuong/${districtId}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPublicMap = (address) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})