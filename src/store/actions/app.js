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

export const getCategoriesLimit = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetCategoriesLimit(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CATEGORIES_LIMIT,
                categories: response.data.response?.rows,
                countCategory: response.data.response?.count,
            })
        } else {
            dispatch({
                type: actionTypes.GET_CATEGORIES_LIMIT,
                msg: response.data.msg,
                categories: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORIES_LIMIT,
            categories: null,
            msg: error
        })
    }
}

export const editCategoryData = (dataCategoryEdit) => ({
    type: actionTypes.EDIT_DATA_CATEGORY,
    dataCategoryEdit
})

export const resetDataCategoryEdit = () => ({
    type: actionTypes.RESET_DATA_CATEGORY_EDIT,
})
