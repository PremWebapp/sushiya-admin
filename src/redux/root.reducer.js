import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import userReducer from "./user/user.reducer";
// import tokenReducer from "./token/token.reducer";
// import indexReducer from "./index/index.reducer";
// import cartReducer from "./cart/cart.reducer";
import AuthReducer from "./auth/auth.reducer";
const persistConfig = {
  key: "sushiya",
  storage,
  // blacklist: ["cartReducer"],
};

const rootReducer = combineReducers({
        auth: AuthReducer,
        // token: tokenReducer,
        // indexReducer: indexReducer,
        // cartReducer: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
