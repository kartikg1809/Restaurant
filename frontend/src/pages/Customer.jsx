import React, { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import SliderButton from '../components/SliderButton';
import Cart from '../components/Cart';

const Customer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(true);
  console.log(cart);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/item/get-all');
        const data = await res.json();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredData = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery)
    );
    setFilteredItems(filteredData);
  };

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === itemId.name);
      if (existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.name === itemId.name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter((cartItem) => cartItem.id !== itemId);
      }
    });
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="flex">
      <div className="bg-gray-200 w-56 p-4 h-screen y-overflow-auto">
        <h2 className="text-2xl font-bold mb-4 mt-5">Menu Categories</h2>
        <ul className="space-y-4 text-lg p-2">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 p-2" />
              Appetizers
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 p-2" />
              Main Course
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 p-2" />
              Drinks
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 p-2" />
              Desserts
            </label>
          </li>
        </ul>
        <div className="py-4">
          <select
            id="price"
            name="price"
            className="border border-slate-600 p-2 rounded-md text-lg"
          >
            <option value="">Price</option>
            <option value="">High to Low</option>
            <option value="Drinks">Low to High</option>
          </select>
        </div>
        <div className="flex gap-2">
          <SliderButton type={'veg'} /> <SliderButton type={'nonveg'} />
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search items..."
            onChange={handleSearchChange}
            className="p-2 border rounded-lg w-full max-w-xs"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} addToCart={() => handleAddToCart(item)} />
          ))}
        </div>
      </div>

      <button
        className="fixed bottom-6 right-6 bg-slate-600 text-white p-4 rounded-full text-2xl shadow-lg hover:bg-slate-800 transition duration-300"
        onClick={toggleCart}
      >
        🛒 {cart.length}
      </button>

      <Cart
        show={showCart}
        cart={cart}
        handleRemoveFromCart={handleRemoveFromCart}
        toggleCart={toggleCart}
      />
    </div>
  );
};

export default Customer;
