import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const ItemTable = ({ items,handleDelete }) => {
  
  return (
    <div className="overflow-x-auto flex p-8 items-center justify-center">
      <table className="bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-slate-800">
          <tr>
            <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider">Available</th>
            <th className="px-4 py-3 text-left text-md font-medium text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-2 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-2 whitespace-nowrap w-32 h-32"><img src={item.image} alt="" /></td>
              <td className="px-6 py-2 whitespace-nowrap">₹{item.price}</td>
              <td className="px-6 py-2 whitespace-nowrap">{item.category}</td>
              <td className="px-6 py-2 whitespace-nowrap">{item.isVeg ? "Vegetarian" : "Non-Vegetarian"}</td>
              <td className="px-6 py-2 whitespace-nowrap">{item.isAvailable ? "Yes" : "No"}</td>
              <td className="px-6 py-2 whitespace-nowrap space-x-4">
                <Link to={`/update-item/${item._id}`}>
                  <button><MdEdit className="w-6 h-6 text-blue-600 hover:text-blue-900" /></button>
                </Link>
                <button
                  onClick={()=>handleDelete(item)}
                  className="text-red-700 hover:text-red-800"
                >
                  <MdDelete className="w-6 h-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
