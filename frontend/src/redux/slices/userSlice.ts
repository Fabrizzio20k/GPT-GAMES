import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import OfferBySeller from "@/interfaces/OfferBySeller";

const initialState: User = {
    id: "",
    email: "",
    profile_photo: "",
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    description: "",
    token: "",
    offers: [],
    shoppingCartID: "",
    shoppingCartElements: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.profile_photo = action.payload.profile_photo;
            state.username = action.payload.username;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.phone = action.payload.phone;
            state.description = action.payload.description;
            state.token = action.payload.token;
            state.offers = action.payload.offers;
            state.shoppingCartID = action.payload.shoppingCartID;
            state.shoppingCartElements = action.payload.shoppingCartElements;
        },
        clearUser: (state) => {
            state.id = "";
            state.email = "";
            state.profile_photo = "";
            state.username = "";
            state.first_name = "";
            state.last_name = "";
            state.phone = "";
            state.description = "";
            state.token = "";
            state.offers = [];
            state.shoppingCartID = "";
            state.shoppingCartElements = [];
        },
        updateToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        updateUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        updateProfilePhoto: (state, action: PayloadAction<string>) => {
            state.profile_photo = action.payload;
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
        },
        pushOffer: (state, action: PayloadAction<OfferBySeller>) => {
            state.offers.push(action.payload);
        },
        updateShoppingCartID: (state, action: PayloadAction<string>) => {
            state.shoppingCartID = action.payload;
        },
        updateShoppingCartElements: (state, action: PayloadAction<OfferBySeller[]>) => {
            state.shoppingCartElements = action.payload;
        },
        pushShoppingElement: (state, action: PayloadAction<OfferBySeller>) => {
            state.shoppingCartElements.push(action.payload);
        },
    },
});

export const { setUser, clearUser, updateToken, updateProfilePhoto, updateUsername, updateFirstname, updateLastname, updatePhone, updateDescription, updateOffers, pushOffer, updateShoppingCartID, updateShoppingCartElements, pushShoppingElement } = userSlice.actions;
export const userReducer = userSlice.reducer;