import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";

const appStore = configureStore({
    reducer: {
        login: loginReducer,
    }
});

export default appStore;