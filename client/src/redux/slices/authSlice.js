import { createSlice } from "@reduxjs/toolkit";

import { login, logout, register, revalidateToken } from "../actions";

const authSlice =  createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        status: 'idle',
        error: null,
        isLogin: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload.user
                state.token = action.payload.token
                state.isLogin = true
                state.error = null
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload.user
                state.token = action.payload.token
                state.isLogin = true
                state.error = null
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(revalidateToken.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(revalidateToken.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload.user
                state.token = action.payload.token
                state.isLogin = true
                state.error = null
            })
            .addCase(revalidateToken.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.token = null
                state.isLogin = false
                state.error = null
            })
    }
})

export default authSlice.reducer