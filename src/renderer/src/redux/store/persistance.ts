import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import authReducer from "../slices/authSlice";
import errorReducer from "../slices/errorSlice";
import sessionReducer from "../slices/sessionSlice";

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    keyPrefix: 'redux-',
    whitelist: [],
};

const userPersistConfig = {
    key: 'user',
    storage: storage,
    keyPrefix: 'redux-',
    whitelist: ['isAuthenticated', 'user', 'permissions', 'organization'],
};

const errorHandlerPersistConfig = {
    key: 'errorHandler',
    storage: storage,
    keyPrefix: 'redux-',
    whitelist: [],
};

const sessionPersistConfig = {
    key: 'session',
    storage: storage,
    keyPrefix: 'redux-',
    whitelist: ['isAlive'],
};


const rootReducer = combineReducers({
    errorHandler: persistReducer(errorHandlerPersistConfig, errorReducer),
    auth: persistReducer(userPersistConfig, authReducer),
    session: persistReducer(sessionPersistConfig, sessionReducer),

})

export { rootPersistConfig, rootReducer };
