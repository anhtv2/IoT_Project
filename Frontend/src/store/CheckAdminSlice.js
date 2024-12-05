import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAdmin: -1,
}

export const CheckAdminSlice = createSlice({
  name: 'isAdmin',
  initialState,
  reducers: {
    confirmAdmin: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAdmin = 1;
    },
    confirmNotAdmin: (state) => {
      state.isAdmin = 0;
    },
  },
})

// Action creators are generated for each case reducer function
export const { confirmAdmin, confirmNotAdmin } = CheckAdminSlice.actions;
export const selectAdmin = (state) => state.isAdmin;

export default CheckAdminSlice.reducer;