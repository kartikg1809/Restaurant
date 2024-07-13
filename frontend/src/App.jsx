import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import AddItem from './pages/AddItem';
import AdminItems from './pages/AdminItems';
import UpdateItem from './pages/UpdateItem';
import Customer from './pages/Customer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Unauthorized from './pages/Unauthorized';
const App = () => {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<Signup />} />
            <Route path="/" element={<Signup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/customer-dashboard" element={<Customer />} />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin', 'staff']} />
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute element={<Orders />} allowedRoles={['admin', 'staff']} />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute element={<Profile />} allowedRoles={['admin','staff']} />
              }
            />
            <Route
              path="/show-items"
              element={
                <ProtectedRoute element={<AdminItems />} allowedRoles={['admin', 'staff']} />
              }
            />
            <Route
              path="/update-item/:itemId"
              element={
                <ProtectedRoute element={<UpdateItem />} allowedRoles={['admin', 'staff']} />
              }
            />
            <Route
              path="/add-item"
              element={
                <ProtectedRoute element={<AddItem />} allowedRoles={['admin', 'staff']} />
              }
            />
          </Routes>
    </BrowserRouter>
  );
};

export default App;
