import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface UserState {
    id: string;
    email: string;
    username: string;
}

const initialState: UserState = {
    id: "",
    email: "",
    username: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.username = action.payload.username;
        },
        clearUser: (state) => {
            state.id = "";
            state.email = "";
            state.username = "";
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;