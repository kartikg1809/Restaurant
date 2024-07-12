import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Sidebar from './components/Sidebar';
import AddItem from './pages/AddItem';
import AdminItems from './pages/AdminItems';
import UpdateItem from './pages/UpdateItem';
import Customer from './pages/Customer';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<Signup />} />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin', 'staff']} />
              }
            />
            <Route
              path="/show-items"
              element={
                <ProtectedRoute element={<AdminItems />} allowedRoles={['admin', 'staff']} />
              }
            />
            <Route
              path="/customer-page"
              element={
                <ProtectedRoute element={<Customer />} allowedRoles={['customer','admin','staff']} />
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
