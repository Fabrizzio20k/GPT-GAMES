import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

const initialState: User = {
    id: "",
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    phone: "",
    description: "",
    token: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.phone = action.payload.phone;
            state.description = action.payload.description;
            state.token = action.payload.token;
        },
        clearUser: (state) => {
            state.id = "";
            state.email = "";
            state.username = "";
            state.firstname = "";
            state.lastname = "";
            state.phone = "";
            state.description = "";
            state.token = "";
        },
        updateToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        updateUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        updateFirstname: (state, action: PayloadAction<string>) => {
            state.firstname = action.payload;
        },
        updateLastname: (state, action: PayloadAction<string>) => {
            state.lastname = action.payload;
        },
        updatePhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        updateDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
    },
});

export const { setUser, clearUser, updateToken, updateUsername, updateFirstname, updateLastname, updatePhone, updateDescription } = userSlice.actions;
export const userReducer = userSlice.reducer;