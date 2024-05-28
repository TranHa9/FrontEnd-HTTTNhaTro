import actionTypes from "../actions/actionTypes";
const initState = {
    msg: '',
    categories: [],
    countCategory: 0,
    dataCategoryEdit: null,
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES:
        case actionTypes.GET_CATEGORIES_LIMIT:
            return {
                ...state,
                categories: action.categories || [],
                msg: action.msg || '',
                countCategory: action.countCategory || 0,
            }
        case actionTypes.EDIT_DATA_CATEGORY:
            return {
                ...state,
                dataCategoryEdit: action.dataCategoryEdit || null
            }
        case actionTypes.RESET_DATA_CATEGORY_EDIT:
            return {
                ...state,
                dataCategoryEdit: null,
            }
        default:
            return state;
    }
}

export default appReducer