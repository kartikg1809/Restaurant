import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from './pages/Signup';
import Sidebar from './components/Sidebar';
import AddItem from './pages/AddItem';
import AdminItems from './pages/AdminItems';
import UpdateItem from './pages/UpdateItem';
import Customer from './pages/Customer';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto">
          <Routes>
          <Route path="/show-items" element={<AdminItems />} />
          <Route path="/items-page" element={<Customer />} />
          <Route path="/update-item/:itemId" element={<UpdateItem/>} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/sign-in" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
