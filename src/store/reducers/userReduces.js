import actionTypes from "../actions/actionTypes";

const initState = {
    currentData: {
    }
}
const userReduces = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CURRENT:
            return {
                ...state,
                currentData: action.currentData || {}
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