"use client"
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer";
import NewsDataReducer from "./reducers/NewsDataReducer";



export default configureStore({
    reducer: {
        user: UserReducer,
        news: NewsDataReducer 
    }
})