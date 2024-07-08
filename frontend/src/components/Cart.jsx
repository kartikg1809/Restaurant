import React from 'react';
import { IoCloseCircle } from "react-icons/io5";

const Cart = ({ show, cart, handleRemoveFromCart, toggleCart }) => {
  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = total * 0.18;
    return { total, tax, grandTotal: total + tax };
  };

  const { total, tax, grandTotal } = calculateTotal();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
        show ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 overflow-y-auto`}
    >
    
      <div className="p-4">
      <div className='flex justify-between py-4'>
        <h2 className="text-2xl font-bold text-center">Cart</h2>
        <button
          onClick={toggleCart}
          className="text-slate-600 text-4xl transition duration-300"
        >
<IoCloseCircle />
        </button>
        </div>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
          
        ) : (
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-24 h-16 object-cover rounded-md" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">₹{item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="border-t mt-4 pt-4">
          <p className="flex justify-between">
            <span>Total:</span>
            <span className="font-semibold text-gray-800">₹{total.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (18%):</span>
            <span className="font-semibold text-gray-800">₹{tax.toFixed(2)}</span>
          </p>
          <p className="flex justify-between font-bold mt-2">
            <span>Grand Total:</span>
            <span className="font-bold text-blue-600">₹{grandTotal.toFixed(2)}</span>
          </p>
        </div>
        <div className='flex'>
        <button className='m-2 w-full mx-auto p-4 bg-slate-600 rounded-md text-white font-semibold'>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
