import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const socket = io('http://localhost:3000');

  useEffect(() => {
      socket.on('newOrder', (order) => {
      setOrders((prevOrders) => [...prevOrders, order]);
    });

    socket.on('orderCompleted', (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  useEffect(() => {
    const handleOrders = async () => {
        try {
          setError(false);
          const res = await fetch(`/api/order/get`);
          const data = await res.json();
          if (data.success === false) {
            enqueueSnackbar("Some error occurred", { variant: "error" });
            return;
          }
          setOrders(data);
        } catch (error) {
          enqueueSnackbar("Some error occurred", { variant: "error" });
          setError(true);
        }
      };
    handleOrders();
  }, []);

  const handleComplete = async (id) => {
    try {
      await fetch(`/api/order/update/${id}`, {
        method: 'POST',
      });
      setOrders((prevOrders) => prevOrders.filter(order => order._id !== id));
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  return (
    <div className="flex">
      <div className="mx-auto ml-64 mt-4">
        <div className="mb-4 flex justify-center">
          <h1 className="text-2xl font-bold mb-4">Orders</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider">Table</th>
                <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-2 px-4 font-semibold text-center text-xl">No orders left</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className={`${order.completed ? 'bg-gray-200' : ''}`}>
                    <td className="py-2 px-4 border-b text-center">{order.tableNumber}</td>
                    <td className="py-2 px-4 border-b">
                      {order.completed ? 'Completed' : 'Pending'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <ul>
                        {order.items.map((item) => (
                          <li key={item.id}>{item.name} (x{item.quantity})</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className={`px-3 py-1 rounded ${
                          order.completed ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                        }`}
                        onClick={() => handleComplete(order._id)}
                        disabled={order.completed}
                      >
                        {order.completed ? 'Completed' : 'Mark as Completed'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
};

export default OrderTable;
