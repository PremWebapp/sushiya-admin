
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import authReducer from "./reducers/authReducer";
import countryCityReducer from "./reducers/country&cityReducer";
import restorentReducer from "./reducers/restorentReducer";

const persistConfig = {
    key: "sushiya",
    storage,
}

const combinedReducer = combineReducers({
    auth: authReducer,
    countryAcity: countryCityReducer,
    restaurant: restorentReducer,
});
const rootReducer = (state, action) => {
    if (action.type === 'auth/logout') {
        // this function will be triggered when logout occerd && reset all store
        state = undefined;
    }
    return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)