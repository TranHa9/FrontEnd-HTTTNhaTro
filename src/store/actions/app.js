import actionTypes from './actionTypes';
import * as apis from '../../services';

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCategories()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                categories: response.data.response,
                msg: ''
            })
        } else {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                msg: response.data.msg,
                categories: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            categories: null,
            msg: error
        })
    }
}
