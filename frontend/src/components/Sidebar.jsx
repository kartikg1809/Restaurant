import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaClipboardList, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="flex-1 h-screen fixed w-64 bg-slate-800 text-white flex flex-col">
      <h1 className="text-2xl font-bold p-4 mt-7">Admin Panel</h1>
      <nav className="flex-grow">
        <ul className="space-y-4 p-6">
          <li className="flex items-center">
            <FaHome className="mr-2" />
            <Link to="/home" className="text-lg hover:text-gray-300">Home</Link>
          </li>
          <li className="flex items-center">
            <FaClipboardList className="mr-2" />
            <Link to="/orders" className="text-lg hover:text-gray-300">Orders</Link>
          </li>
          <li className="flex items-center">
            <FaBoxOpen className="mr-2" />
            <Link to="/items" className="text-lg hover:text-gray-300">Items</Link>
          </li>
          <li className="flex items-center">
            <FaUser className="mr-2" />
            <Link to="/profile" className="text-lg hover:text-gray-300">Profile</Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto p-6">
        <li className="flex items-center">
          <FaSignOutAlt className="mr-2" />
          <Link to="/logout" className="text-lg hover:text-gray-300">Logout</Link>
        </li>
      </div>
    </div>
  );
}

export default Sidebar;
