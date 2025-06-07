import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./userSlice.js"

const store = configureStore({
    reducer: {
        auth: authSlice
    }
})

export default store