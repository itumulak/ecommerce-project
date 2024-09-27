import { configureStore } from "@reduxjs/toolkit";

import cartReducer from './slices/cartSlice';
import { localStateFromLocalStorage, saveStateToLocalStorage } from "../util/localStorage";

const preloadedState = localStateFromLocalStorage()

const store = configureStore({
    reducer: {
        cart: cartReducer
    },
    preloadedState
})

store.subscribe(() => {
    try {
        const state = store.getState()

        saveStateToLocalStorage({
            cart: state.cart
        })
    } catch (error) {
        console.warn('Error subscribing to store updates:', error);
    }
})

export default store