import actionTypes from "../actions/actionTypes";

const initState = {
    currentData: {},
    users: [],
    msg: '',
    count: 0,
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
                count: action.count || 0,
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