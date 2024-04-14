import axiosConfig from "../axiosConfig";
import axios from "axios";


//Lấy tất cả bài đăng
export const apiGetPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

//Lấy bài đăng theo query
export const apiGetPostsLimit = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/limit`,
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


//Bài đăng mới
export const apiGetNewPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/new-post`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUploadImages = (images) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
            data: images
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


//Tạo bài đăng
export const apiCreateNewPost = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/post/create-new`,
            data: payload,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


//Lấy bài đăng theo user
export const apiGetPostsLimitAdmin = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/limit-admin`,
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})