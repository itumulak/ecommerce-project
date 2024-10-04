import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const stripeSession = createAsyncThunk(
    'cart/stripeSession',
    async ({sessionId}, { rejectWithValue }) => {        
        try {
            const response = await fetch(`/api/stripe-session`, {
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

export const saveOrder = createAsyncThunk(
    'cart/saveOrder',
    async ({items, session, userId}, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/orders', {
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

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {            
            const existingProduct = state.products.find(product => product._id === action.payload._id)

            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity || 1
            }
            else {
                state.products.push({
                    ...action.payload,
                    quantity: action.payload.quantity || 1
                })
            }

            state.total = computeSubtotal(state.products)
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload)
            state.total = computeSubtotal(state.products)
        },
        updateQty: (state, action) => {
            const updatedProducts = []

            state.products.forEach(product => {
                if (product._id === action.payload.id) {
                    updatedProducts.push({
                        ...product,
                        quantity: action.payload.quantity
                    })
                } else {
                    updatedProducts.push(product)
                }
            })  
            state.products = updatedProducts   
            state.total = computeSubtotal(state.products) 
        },
        emptyCart: (state) => {
            state.products = []
            state.total = 0
        }
    }
})

const computeSubtotal = (products) => {
    return products.reduce((acc, product) => {
        console.log(product);        
        return acc + (product.price * product.quantity)
    }, 0)
}

export default cartSlice.reducer
export const { addProduct, removeProduct, updateQty, emptyCart } = cartSlice.actions