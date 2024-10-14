import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOrders = createAsyncThunk(
    'db/getOrders',
    async ({user_id: userId}, { rejectWithValue }) => {        
        try {
            // const response = await fetch(`/api/db/get-orders`, {
            const response = await fetch(`/api/db/get-orders-from-firestore`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId})
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

export const getOrder = createAsyncThunk(
    'db/getOrder',
    async ({userId, orderId}, { rejectWithValue }) => {        
        try {
            const response = await fetch(`/api/db/get-order-from-firestore`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId, orderId})
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

export const stripeSession = createAsyncThunk(
    'cart/stripeSession',
    async ({sessionId}, { rejectWithValue }) => {        
        try {
            const response = await fetch(`/api/stripe/retrieve-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({sessionId})
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

export const saveOrderToDB = createAsyncThunk(
    'cart/saveOrder',
    async ({items, session, userId}, { rejectWithValue }) => {
        try {
            // const response = await fetch('/api/db/save-order', {
            const response = await fetch('/api/db/save-order-to-firebase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({items, session, userId})
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
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/register', {
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
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
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

export const revalidateToken = createAsyncThunk(
    'auth/revalidateToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/revalidate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
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