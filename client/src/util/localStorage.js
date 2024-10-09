export const localStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage?.getItem('cart');

        if (serializedState === null) {
            return undefined
        }

        return JSON.parse(serializedState)
    } catch (error) {
        console.warn("Could not load cart from local storage", error)
        return undefined
    }
}

export const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('cart', serializedState)
    } catch (error) {
        console.warn("Could not save cart to local storage", error)
    }
}