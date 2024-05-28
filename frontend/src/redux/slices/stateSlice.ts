import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface statusState {
    logged: boolean;
}

const initialState: statusState = {
    logged: false,
};

export const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        setStatusLoggin: (state, action: PayloadAction<statusState>) => {
            state.logged = action.payload.logged;
        },
    },
});

export const { setStatusLoggin } = statusSlice.actions;
export const statusReducer = statusSlice.reducer;