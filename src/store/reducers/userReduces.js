import actionTypes from "../actions/actionTypes";

const initState = {
    currentData: {},
    users: [],
    msg: '',
    countUser: 0,
    dataUserEdit: null,
}
const userReduces = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CURRENT:
            return {
                ...state,
                currentData: action.currentData || {}
            }
        case actionTypes.GET_USERS_LIMIT:
            return {
                ...state,
                users: action.users || [],
                msg: action.msg || '',
                countUser: action.countUser || 0,
            }
        case actionTypes.EDIT_USER_DATA:
            return {
                ...state,
                dataUserEdit: action.dataUserEdit || null
            }
        case actionTypes.RESET_DATA_USER_EDIT:
            return {
                ...state,
                dataUserEdit: null,
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                currentData: {}
            }
        default:
            return state;
    }
}
export default userReduces