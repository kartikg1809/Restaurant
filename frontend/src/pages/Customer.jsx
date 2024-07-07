import React, { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';

const Customer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  
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
    }
    fetchItems();
  }, []);

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredData = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
    );
    setFilteredItems(filteredData);
  };

  return (
    <div className="flex">
      <div className="bg-gray-200 w-56 p-4 h-screen">
        <h2 className="text-2xl font-bold mb-4 mt-5">Menu Categories</h2>
        <ul className="space-y-4 text-lg p-2">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className='mr-2 p-2' />
              Appetizers
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 p-2"
              />
              Main Course
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 p-2"
              />
              Drinks
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 p-2"
              />
              Desserts
            </label>
          </li>
        </ul>
        <div className='py-4'>
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
          {filteredItems
            .map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Customer;
