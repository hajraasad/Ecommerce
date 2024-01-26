import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./CartSlice";

const store = configureStore({
    reducer: rootReducer
});

export default store;