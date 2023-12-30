"use client"
import { createSlice } from '@reduxjs/toolkit'

const isLocalStorageAvailable = () => typeof window !== 'undefined' && window.localStorage;


export const newsDataReducer = createSlice({
    name: 'newsData',
    initialState: isLocalStorageAvailable() ? JSON.parse(localStorage.getItem("news")) || {
        news: null,
        savedNews: null,
        displayGrid: false,
        isDialog: false,
        dialogData: null
    } : {
        news: null,
        savedNews: null,
        displayGrid: false,
        isDialog: false,
        dialogData: null
    },
    reducers: {
        STORENEWSDATA: (state, action) => {
            var setNewsData = {
                ...state,
                news: action.payload,
            };
            localStorage.setItem("news", JSON.stringify(setNewsData));
            return setNewsData;
        },

        STORESAVEDNEWS: (state, action) => {
            var setSavedNewsData = {
                ...state,
                savedNews: action.payload,
            };
            localStorage.setItem("news", JSON.stringify(setSavedNewsData));
            return setSavedNewsData;
        },

        TOGGLEVIEW: (state, action) => {
            var setView = {
                ...state,
                displayGrid: !state.displayGrid,
            };
            localStorage.setItem("news", JSON.stringify(setView));
            return setView;
        },

        

        TOGGLEDIALOG: (state, action) => {
            var setDialog = {
                ...state,
                isDialog: !state.isDialog,
                dialogData: action.payload,
            };
            localStorage.setItem("news", JSON.stringify(setDialog));
            return setDialog;
        },


        TOGGLESAVEDNEWS: (state, action) => {
            const { payload } = action;
            const savedNews = state.savedNews || [];

            const index = savedNews.findIndex((item) => item.title === payload.title);

            if (index === -1) {
                
                const updatedSavedNews = [...savedNews, payload];
                const updatedState = {
                    ...state,
                    savedNews: updatedSavedNews,
                };
                localStorage.setItem("news", JSON.stringify(updatedState));
                return updatedState;
            } else {
                
                const updatedSavedNews = savedNews.filter((item) => item.title !== payload.title);
                const updatedState = {
                    ...state,
                    savedNews: updatedSavedNews,
                };
                localStorage.setItem("news", JSON.stringify(updatedState));
                return updatedState;
            }
        },
    }
})


export const { STORENEWSDATA, STORESAVEDNEWS, TOGGLEVIEW, TOGGLEDIALOG, TOGGLESAVEDNEWS } = newsDataReducer.actions
export default newsDataReducer.reducer