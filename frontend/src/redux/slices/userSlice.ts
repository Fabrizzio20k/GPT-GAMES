import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import OfferBySeller from "@/interfaces/OfferBySeller";

const initialState: User = {
    id: "",
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    description: "",
    token: "",
    offers: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.phone = action.payload.phone;
            state.description = action.payload.description;
            state.token = action.payload.token;
            state.offers = action.payload.offers;
        },
        clearUser: (state) => {
            state.id = "";
            state.email = "";
            state.username = "";
            state.first_name = "";
            state.last_name = "";
            state.phone = "";
            state.description = "";
            state.token = "";
            state.offers = [];
        },
        updateToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        updateUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        updateFirstname: (state, action: PayloadAction<string>) => {
            state.first_name = action.payload;
        },
        updateLastname: (state, action: PayloadAction<string>) => {
            state.last_name = action.payload;
        },
        updatePhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        updateDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        updateOffers: (state, action: PayloadAction<OfferBySeller[]>) => {
            state.offers = action.payload;
        }
    },
});

export const { setUser, clearUser, updateToken, updateUsername, updateFirstname, updateLastname, updatePhone, updateDescription, updateOffers } = userSlice.actions;
export const userReducer = userSlice.reducer;