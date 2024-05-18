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
export const apiGetPostsLimitUser = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/limit-user`,
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

// sửa tin đăng
export const apiUpdatePost = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/post/update-post`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

//Xóa bài đăng
export const apiDeletePost = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/post/delete-post`,
            params: { postId }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

//Thêm tin đã lưu
export const apiaddSavePost = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/post/save-post`,
            data: payload,
        })
        resolve(response);
    } catch (error) {
        reject(error)
    }
})

//Lấy bài đăng đã lưu theo user
export const apiGetSavePostsLimit = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/limt-save-post`,
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

//Xóa bài đăng đã lưu
export const apiDeleteSavePost = (savePostId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/post/delete-save-post`,
            params: { savePostId }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPostsStatus = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/status-post`,
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPostsAllAdmin = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/admin-all-post`,
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})