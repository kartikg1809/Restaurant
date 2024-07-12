import React from 'react';
import { Link } from 'react-router-dom';
const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
      <p className="text-lg text-gray-800">You do not have permission to access this page.</p>
      <Link to={'/sign-in'}><p className='hover:underline py-4 text-lg'>Click to go back to Sign In</p></Link>
    </div>
  );
};

export default Unauthorized;
