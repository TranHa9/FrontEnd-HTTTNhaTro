import actionTypes from './actionTypes';
import * as apis from '../../services';

export const getCurrent = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCurrent()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CURRENT,
                currentData: response.data.response,
                msg: ''
            })
        } else {
            dispatch({
                type: actionTypes.GET_CURRENT,
                msg: response.data.msg,
                currentData: null
            })
            dispatch({ type: actionTypes.LOGOUT })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CURRENT,
            currentData: null,
            msg: error
        })
        dispatch({ type: actionTypes.LOGOUT })
    }
}


export const apiGetAllUser = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetAllUser(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_USERS_LIMIT,
                users: response.data.response?.rows,
                count: response.data.response?.count,
            })
        } else {
            dispatch({
                type: actionTypes.GET_USERS_LIMIT,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_USERS_LIMIT,
            users: null,
            msg: error
        })
    }
}