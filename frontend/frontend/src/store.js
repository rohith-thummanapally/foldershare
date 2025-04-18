import { configureStore } from "@reduxjs/toolkit";
import { folderreducer } from "./redux/folderSlice.js";
import { fileReducers } from "./redux/fileSlice.js";
export const store=configureStore({
    reducer:{
        folderreducer,
        fileReducers
    }
});