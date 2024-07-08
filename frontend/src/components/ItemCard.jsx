import React, { useState } from 'react';
const ItemCard = ({ item,addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="max-w-xs w-full border border-gray-200 rounded-lg overflow-hidden shadow-md">
      <div className="p-4 space-y-2">
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md" />
        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
        <p className="text-gray-700 mb-2">₹{item.price.toFixed(2)}</p>
        <div className="flex justify-between ">
        <div>
          <button onClick={decreaseQuantity} className="bg-gray-200 text-black px-3 py-1 rounded-md">
            -
          </button>
          <span className="px-3">{quantity}</span>
          <button onClick={increaseQuantity} className="bg-gray-200 text-black px-3 py-1 rounded-md">
            +
          </button>
          </div>
          <div>
          <button onClick={addToCart} className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition duration-300">
          Add to Cart
        </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
