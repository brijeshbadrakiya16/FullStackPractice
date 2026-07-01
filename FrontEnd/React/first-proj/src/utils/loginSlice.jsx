import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        name:"visitor",
    },
    reducers: {
        updateName: (state,action) => {
            state.name = action.payload;
        },
        removeData: (state) => {
            state.name = "visitor";
        }
    }
});

export const {updateName,removeData} = loginSlice.actions;

export default loginSlice.reducer;