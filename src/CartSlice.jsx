import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    /**
     * Adds an item to the cart. If the item already exists, it increases the quantity.
     * @param {object} state - The current state of the cart.
     * @param {object} action - The action containing the payload (the item to add).
     */
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from the action payload
      const existingItem = state.items.find(item => item.name === name); // Check if the item already exists

      if (existingItem) {
        existingItem.quantity++; // If it exists, increment the quantity
      } else {
        // If it does not exist, add it to the cart with a quantity of 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    /**
     * Removes an item from the cart based on its name.
     * @param {object} state - The current state of the cart.
     * @param {object} action - The action containing the payload (the name of the item to remove).
     */
    removeItem: (state, action) => {
      // Filter out the item that matches the name in the payload
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    /**
     * Updates the quantity of a specific item in the cart.
     * @param {object} state - The current state of the cart.
     * @param {object} action - The action containing the payload (item's name and new quantity).
     */
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Destructure the name and new quantity
      const itemToUpdate = state.items.find(item => item.name === name); // Find the item to update

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // Update its quantity
      }
    },
  },
});

// Export the action creators to be used in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer to be included in the store
export default CartSlice.reducer;