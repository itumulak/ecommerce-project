import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong')
            }
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async ({ email, password }, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()
            
            if (response.ok) {
                dispatch(login({ email, password }))
            }
            else {
                throw new Error(data.message || 'Something went wrong')
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const authSlice =  createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload
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
                state.user = action.payload
                state.error = null
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // .addCase(logout.pending, (state) => {
            // .addCase(logout.fulfilled, (state) => {
            //     state.user = null
            //     state.status = 'idle'
            // })
    }
})

export default authSlice.reducer