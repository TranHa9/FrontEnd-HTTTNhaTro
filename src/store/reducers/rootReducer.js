import authReduces from "./authReduces";
import userReduces from "./userReduces";
import postReducer from "./postReduces";
import appReducer from "./appReduces";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import postSaveReduces from "./postSaveReduces";


const commonConfig = {
    storage,
    stateReconclier: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whilelist: ['isLoggedIn', 'token']
}
const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReduces),
    user: userReduces,
    post: postReducer,
    app: appReducer,
    heart: postSaveReduces
})

export default rootReducer