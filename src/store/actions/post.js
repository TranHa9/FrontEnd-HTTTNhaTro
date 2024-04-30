import actionTypes from './actionTypes';
import { apiGetNewPosts, apiGetPosts, apiGetPostsAllStatus, apiGetPostsLimit, apiGetPostsLimitAdmin, apiGetPostsStatus, apiGetSavePostsLimit, apiaddSavePost } from '../../services/post';

export const getPosts = () => async (dispatch) => {
    try {
        const response = await apiGetPosts()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS,
                posts: response.data.response,
                msg: ''
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS,
            posts: null
        })
    }
}

export const getPostsLimit = (query) => async (dispatch) => {
    try {
        const response = await apiGetPostsLimit(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                posts: response.data.response?.rows,
                count: response.data.response?.count,
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_LIMIT,
            posts: null
        })
    }
}

export const getPostsAllStatus = (query) => async (dispatch) => {
    try {
        const response = await apiGetPostsAllStatus(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_STATUS_ALL_POST,
                postAll: response.data.response?.rows,
                countAll: response.data.response?.count,
            })
        } else {
            dispatch({
                type: actionTypes.GET_STATUS_ALL_POST,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_STATUS_ALL_POST,
            postAll: null
        })
    }
}

export const getPostsStatus = (query) => async (dispatch) => {
    try {
        const response = await apiGetPostsStatus(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_STATUS_POST,
                postsStatus: response.data.response?.rows,
                countStatus: response.data.response?.count,
            })
        } else {
            dispatch({
                type: actionTypes.GET_STATUS_POST,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_STATUS_POST,
            countStatus: null
        })
    }
}

export const getSavePostsLimit = (query) => async (dispatch) => {
    try {
        const response = await apiGetSavePostsLimit(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_SAVE_POST,
                savePosts: response.data.response?.rows,
                countSavePost: response.data.response?.count,
            })
        } else {
            dispatch({
                type: actionTypes.GET_SAVE_POST,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_SAVE_POST,
            savePosts: null
        })
    }
}

export const getNewPosts = () => async (dispatch) => {
    try {
        const response = await apiGetNewPosts()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                newPosts: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                msg: response.data.msg,
                newPosts: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_POST,
            newPosts: null
        })
    }
}

export const getPostsLimitAdmin = (query) => async (dispatch) => {
    try {
        const response = await apiGetPostsLimitAdmin(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_ADMIN,
                postOfCurrent: response.data.response?.rows,
                postCount: response.data.response?.count,
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_ADMIN,
                msg: response.data.msg,
                postOfCurrent: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_ADMIN,
            postOfCurrent: null
        })
    }
}

export const editData = (dataEdit) => ({
    type: actionTypes.EDIT_DATA,
    dataEdit
})
export const resetDataEdit = () => ({
    type: actionTypes.RESET_DATAEDIT,
})