import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Correctly import actions
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  /**
   * Calculates the total amount for all products in the cart.
   * @returns {string} The total amount formatted to two decimal places.
   */
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      // Remove the '$' sign and convert cost to a number
      const itemCost = parseFloat(item.cost.substring(1));
      total += item.quantity * itemCost;
    });
    return total.toFixed(2);
  };

  /**
   * Calls the onContinueShopping prop to navigate back to the product list.
   * @param {Event} e - The click event.
   */
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  /**
   * Placeholder function for checkout functionality.
   */
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  /**
   * Dispatches an action to increase the quantity of an item.
   * @param {object} item - The cart item to increment.
   */
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  /**
   * Dispatches an action to decrease the quantity of an item or remove it if the quantity is 1.
   * @param {object} item - The cart item to decrement.
   */
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity is 1, dispatch removeItem action
      dispatch(removeItem(item.name));
    }
  };

  /**
   * Dispatches an action to remove an item completely from the cart.
   * @param {object} item - The cart item to remove.
   */
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  /**
   * Calculates the total cost for a single item based on its quantity.
   * @param {object} item - The cart item.
   * @returns {string} The subtotal for the item formatted to two decimal places.
   */
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.substring(1));
    const totalCost = item.quantity * itemCost;
    return totalCost.toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;