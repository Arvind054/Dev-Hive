import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    isAuthenticated : false,
}
const userSlice = createSlice({
    name: 'user',
    initialState:{},
    reducers:{
    loginUser: (state, action)=>{
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logOutUser:(state, action)=>{
        state.user = null,
        state.isAuthenticated = false;
    },
    updateUser:(state, action)=>{
        state.user = action.payload;
        state.isAuthenticated = true;
    }
    }
});

export const {loginUser, logOutUser,updateUser} = userSlice.actions;
export default userSlice.reducer;