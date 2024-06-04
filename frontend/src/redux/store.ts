import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { statusReducer } from "./slices/stateSlice";
import { userReducer } from "./slices/userSlice";
const statePersistConfig = {
    key: "status",
    storage: storage,
    whitelist: ["logged"],
};

const userPersistConfig = {
    key: "user",
    storage: storage,
    whitelist: ["id", "email", "username", "firstname", "lastname", "phone", "description", "token"],
};

const rootReducer = combineReducers({
    status: persistReducer(statePersistConfig, statusReducer),
    user: persistReducer(userPersistConfig, userReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
