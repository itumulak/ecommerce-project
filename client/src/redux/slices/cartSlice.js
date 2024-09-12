import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    totalQty: 0,
    subTotal: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        totalQty: 0,
        subTotal: 0,
        showCart: false
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

            state.totalQty += action.payload.quantity || 1
            state.subTotal = computeSubtotal(state.products)
        },
        removeProduct: (state, action) => {
            state.totalQty -= state.products.find(product => product._id === action.payload).quantity
            state.products = state.products.filter(product => product._id !== action.payload)
            state.subTotal = computeSubtotal(state.products)
        },
        updateQty: (state, action) => {
            const existingProduct = state.products.find(product => product._id === action.payload._id)

            if (existingProduct) {
                existingProduct.quantity = action.payload.quantity
                state.totalQty += action.payload.quantity - existingProduct.quantity
                state.subTotal = computeSubtotal(state.products)
            }
        },

        toggleCart: (state, action) => {
            state.showCart = action.payload
        }
    }
})

const computeSubtotal = (products) => {
    return products.reduce((acc, product) => acc + product.price * product.quantity, 0)
}

export default cartSlice.reducer
export const { addProduct, removeProduct, updateQty, toggleCart } = cartSlice.actions