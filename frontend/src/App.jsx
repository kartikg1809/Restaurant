import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from './pages/Signup';
import Sidebar from './components/Sidebar';
import AddItem from './pages/AddItem';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/sign-in" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
