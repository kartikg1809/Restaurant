import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useSnackbar } from 'notistack';

const Cart = ({ show, cart, handleRemoveFromCart, toggleCart, updateQuantity }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [tableNumber, setTableNumber] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(tableNumber===""){
      return setError('Please enter table number');
    }
    console.log(cart);
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableNumber: tableNumber,
          items: cart.map(item => ({
            itemId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount: grandTotal,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        enqueueSnackbar(data.message, { variant: "error" });
      }
      enqueueSnackbar("Order Placed successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Some error occurred", { variant: "error" });
      setError(error.message);
      setLoading(false);
    }
  }
  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = total * 0.18;
    return { total, tax, grandTotal: total + tax };
  };

  const { total, tax, grandTotal } = calculateTotal();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
        show ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 overflow-y-auto`}
    >
      <div className="p-4">
        <div className="flex justify-between py-4">
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
              <li
                key={item._id}
                className="py-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">
                      ₹{item.price.toFixed(2)} x {item.quantity}
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="bg-gray-200 text-black px-2 rounded-md"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="bg-gray-200 text-black px-2 rounded-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="text-red-500 hover:text-red-600 text-2xl"
                  >
                    <MdDelete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="border-t mt-4 pt-4">
          <p className="flex justify-between">
            <span>Total:</span>
            <span className="font-semibold text-gray-800">
              ₹{total.toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Tax (18%):</span>
            <span className="font-semibold text-gray-800">
              ₹{tax.toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between font-bold mt-2">
            <span>Grand Total:</span>
            <span className="font-bold text-blue-600">
              ₹{grandTotal.toFixed(2)}
            </span>
          </p>
        </div>
        <div className="mt-4">
          <label htmlFor="tableNumber" className="block text-lg font-semibold mb-1">
            Table Number:
          </label>
          <input
            type="Number"
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full"
            placeholder="Enter table number"
            required
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex">
          <button onClick={handleSubmit}
            disabled={loading} className="m-2 w-full mx-auto p-4 bg-slate-600 rounded-md text-white font-semibold">
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
