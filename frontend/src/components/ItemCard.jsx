import React, { useState, useEffect } from 'react';

const ItemCard = ({ item, addToCart, updateQuantity, cart }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const cartItem = cart.find(cartItem => cartItem._id === item._id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cart, item._id]);

  const handleQuantityChange = (itemId,newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    const cartItem = cart.find(cartItem => cartItem._id === item._id);
    if (cartItem) {
      updateQuantity(item._id, newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(quantity);
  };

  return (
    <div className="max-w-xs w-full border border-gray-200 rounded-lg overflow-hidden shadow-md">
      <div className="p-4 space-y-2">
        <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md" />
        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
        <p className="text-gray-700 mb-2">₹{item.price.toFixed(2)}</p>
        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={() => handleQuantityChange(item._id,quantity - 1)}
              className="bg-gray-200 text-black px-3 py-1 rounded-md"
            >
              -
            </button>
            <span className="px-3">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(item._id,quantity + 1)}
              className="bg-gray-200 text-black px-3 py-1 rounded-md"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
