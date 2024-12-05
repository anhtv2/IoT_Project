import { configureStore } from '@reduxjs/toolkit'
import { default as CheckAdminReducer}  from './CheckAdminSlice.js'
import {default as UpdatePLReducer} from "./UpdatePLSlice";


export const store = configureStore({
  reducer: {
    isAdmin : CheckAdminReducer,
    PL : UpdatePLReducer
  },
})