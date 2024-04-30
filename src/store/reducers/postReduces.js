import actionTypes from "../actions/actionTypes";
const initState = {
    posts: [],
    msg: '',
    count: 0,
    newPosts: [],
    postOfCurrent: [],
    postCount: 0,
    dataEdit: null,
    savePosts: [],
    countSavePost: 0,
    postsStatus: [],
    countStatus: 0,
    postAll: [],
    countAll: 0
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS:
        case actionTypes.GET_POSTS_LIMIT:
            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || '',
                count: action.count || 0,
            }
        case actionTypes.GET_STATUS_ALL_POST:
            return {
                ...state,
                postAll: action.postAll || [],
                msg: action.msg || '',
                countAll: action.countAll || 0,
            }
        case actionTypes.GET_STATUS_POST:
            return {
                ...state,
                postsStatus: action.postsStatus || [],
                msg: action.msg || '',
                countStatus: action.countStatus || 0,
            }
        case actionTypes.GET_SAVE_POST:
            return {
                ...state,
                savePosts: action.savePosts || [],
                msg: action.msg || '',
                countSavePost: action.countSavePost || 0,
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                savePosts: [],
                msg: action.msg || '',
                countSavePost: 0,
            }
        case actionTypes.GET_NEW_POST:
            return {
                ...state,
                newPosts: action.newPosts || [],
                msg: action.msg || '',
            }
        case actionTypes.GET_POSTS_ADMIN:
            return {
                ...state,
                postOfCurrent: action.postOfCurrent || [],
                msg: action.msg || '',
                postCount: action.postCount || 0,
            }
        case actionTypes.EDIT_DATA:
            return {
                ...state,
                dataEdit: action.dataEdit || null
            }
        case actionTypes.RESET_DATAEDIT:
            return {
                ...state,
                dataEdit: null,
            }

        default:
            return state;
    }
}

export default postReducer