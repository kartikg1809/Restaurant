import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Pie, Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import Unauthorized from './Unauthorized';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [analytics, setAnalytics] = useState({
    totalOrders: 0,
    mostSoldItems: [],
    totalRevenue: 0,
    revenueData: [],
    orderData: []
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/order/analytics');
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  const pieData = {
    labels: analytics.mostSoldItems.map(item => item.name),
    datasets: [
      {
        data: analytics.mostSoldItems.map(item => item.quantity),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const lineData = {
    labels: analytics.orderData.map(data => data.date),
    datasets: [
      {
        label: 'Total Revenue',
        data: analytics.revenueData,
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Total Orders',
        data: analytics.orderData.map(data => data.totalOrders),
        fill: false,
        backgroundColor: 'rgba(255,99,132,1)',
        borderColor: 'rgba(255,99,132,1)',
      },
    ],
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 mx-auto">
        {currentUser && currentUser.role === 'admin' ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-4 shadow rounded">
                <h2 className="text-lg font-semibold">Total Orders</h2>
                <p className="text-2xl">{analytics.totalOrders}</p>
              </div>
              <div className="bg-white p-4 shadow rounded">
                <h2 className="text-lg font-semibold">Total Revenue</h2>
                <p className="text-2xl">₹{analytics.totalRevenue.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 shadow rounded">
                <h2 className="text-lg font-semibold">Most Sold Items</h2>
                <Pie data={pieData} />
              </div>
              <div className="bg-white p-4 shadow rounded">
                <h2 className="text-lg font-semibold">Orders and Revenue Over Time</h2>
                <Line data={lineData} />
              </div>
            </div>
          </>
        ) : (
          <Unauthorized/>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
