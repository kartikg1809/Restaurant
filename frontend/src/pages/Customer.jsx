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
  const [categoryFilters, setCategoryFilters] = useState({
    Appetizers: false,
    MainCourse: false,
    Drinks: false,
    Desserts: false,
  });
  const [sortOption, setSortOption] = useState('');
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
    setSearchQuery(searchQuery);
    filterItems(searchQuery, categoryFilters, sortOption);
  };

  const handleCategoryChange = (e) => {
    const { id, checked } = e.target;
    setCategoryFilters(prevFilters => ({
      ...prevFilters,
      [id]: checked
    }));
    filterItems(searchQuery, { ...categoryFilters, [id]: checked }, sortOption);
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setSortOption(value);
    filterItems(searchQuery, categoryFilters, value);
  };

  const filterItems = (searchQuery, categoryFilters, sortOption) => {
    let filteredData = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery)
    );

    if (categoryFilters.Appetizers) {
      filteredData = filteredData.filter(item => item.category === 'Appetizers');
    }
    if (categoryFilters.MainCourse) {
      filteredData = filteredData.filter(item => item.category === 'Main Courses');
    }
    if (categoryFilters.Drinks) {
      filteredData = filteredData.filter(item => item.category === 'Drinks');
    }
    if (categoryFilters.Desserts) {
      filteredData = filteredData.filter(item => item.category === 'Desserts');
    }

    if (sortOption === 'desc') {
      filteredData.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'asce') {
      filteredData.sort((a, b) => a.price - b.price);
    }

    setFilteredItems(filteredData);
  };

  const handleAddToCart = (item, quantity) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((cartItem) => cartItem._id === item._id);
      if (itemExists) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  const updateCartQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      handleRemoveFromCart(itemId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="flex">
      <div className="bg-gray-200 w-56 p-4 h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 mt-5">Menu Categories</h2>
        <ul className="space-y-4 text-lg p-2">
          <li>
            <label className="flex items-center">
              <input
                id="Appetizers"
                type="checkbox"
                className="mr-2 p-2"
                checked={categoryFilters.Appetizers}
                onChange={handleCategoryChange}
              />
              Appetizers
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                id="MainCourse"
                type="checkbox"
                className="mr-2 p-2"
                checked={categoryFilters.MainCourse}
                onChange={handleCategoryChange}
              />
              Main Course
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                id="Drinks"
                type="checkbox"
                className="mr-2 p-2"
                checked={categoryFilters.Drinks}
                onChange={handleCategoryChange}
              />
              Drinks
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                id="Desserts"
                type="checkbox"
                className="mr-2 p-2"
                checked={categoryFilters.Desserts}
                onChange={handleCategoryChange}
              />
              Desserts
            </label>
          </li>
        </ul>
        <div className="py-4">
          <select
            id="price"
            name="price"
            value={sortOption}
            onChange={handleSortChange}
            className="border border-slate-600 p-2 rounded-md text-lg"
          >
            <option value="">Price</option>
            <option id="desc" value="desc">High to Low</option>
            <option id="asce" value="asce">Low to High</option>
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
            <ItemCard
              key={item._id}
              item={item}
              addToCart={(quantity) => handleAddToCart(item, quantity)}
              updateQuantity={updateCartQuantity}
              cart={cart}
            />
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
        updateQuantity={updateCartQuantity}
      />
    </div>
  );
};

export default Customer;
