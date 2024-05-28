import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { statusReducer } from "./slices/stateSlice";
const statePersistConfig = {
    key: "status",
    storage: storage,
    whitelist: ["logged"],
};

const rootReducer = combineReducers({
    status: persistReducer(statePersistConfig, statusReducer),
});

export const store = configureStore({
    reducer: rootReducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
