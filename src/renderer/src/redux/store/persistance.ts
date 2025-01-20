import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import authReducer from "../slices/authSlice";
import errorReducer from "../slices/errorSlice";
import sessionReducer from "../slices/sessionSlice";
import permissionReducer from "../slices/permissionSlice";
import roleReducer from "../slices/roleSlice";
import userReducer from "../slices/userSlice";
import patientReducer from "../slices/patientSlice";

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
    whitelist: ['isAuthenticated', 'user', 'permissions'],
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

const PermissionsPersistConfig = {
    key: 'permissions',
    storage: storage,
    keyPrefix: 'redux-',
    whitelist: ['permissions'],
};

const RolesPersistConfig = {
    key: 'Roles',
    storage: storage,
    keyPrefix: 'redux-',
    whitelist: ['roles'],
};

const UsersPersistConfig = {
    key: 'users',
    storage: storage,
    keyPrefix: 'redux-',
    whitelist: ['users'],
};

const PatientsPersistConfig = {
    key: 'users',
    storage: storage,
    keyPrefix: 'redux-',
    whitelist: ['users'],
};

const rootReducer = combineReducers({
    errorHandler: persistReducer(errorHandlerPersistConfig, errorReducer),
    auth: persistReducer(userPersistConfig, authReducer),
    session: persistReducer(sessionPersistConfig, sessionReducer),
    permissions: persistReducer(PermissionsPersistConfig, permissionReducer),
    roles: persistReducer(RolesPersistConfig, roleReducer),
    users: persistReducer(UsersPersistConfig, userReducer),
    patients: persistReducer(PatientsPersistConfig, patientReducer),
})

export { rootPersistConfig, rootReducer };
