import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import session from "redux-persist/lib/storage/session";
import profile from "@/redux/reducers/token";

// WHITELIST
const persistConfig = {
    key: "root",
    // storage: new CookieStorage(Cookies), //session,
    storage: session,
    whitelist: ["profile"]
};

const rootReducer = combineReducers({
    profile: profile,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
