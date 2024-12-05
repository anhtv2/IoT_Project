import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: 0,
}

export const UpdatePLSlice = createSlice({
    name: 'PL',
    initialState,
    reducers: {
        updatePL: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.id = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { updatePL } = UpdatePLSlice.actions;
export const selectIdPL = (state) => state.id;

export default UpdatePLSlice.reducer;