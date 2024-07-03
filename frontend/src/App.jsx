import React from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from './pages/Signup';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/sign-in" element={<Signup/>}>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App