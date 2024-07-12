import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaClipboardList, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch} from 'react-redux';
import { logoutSuccess, logOutFailure } from '../app/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaBorderAll } from "react-icons/fa";
import Logout from './Logout';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(logOutFailure(data.message));
        return;
      }
      dispatch(logoutSuccess(data));
      setIsModalOpen(false);
      navigate('/sign-in');
    } catch (error) {
      dispatch(logOutFailure(error.message));
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="h-screen w-64 fixed bg-slate-800 text-white flex flex-col">
      <h1 className="text-2xl font-bold p-4 mt-7">Admin Panel</h1>
      <nav className="flex-grow">
        <ul className="space-y-4 p-6">
          <li className="flex items-center">
            <FaHome className="mr-2" />
            <Link to="/admin-dashboard" className="text-lg hover:text-gray-300">Home</Link>
          </li>
          <li className="flex items-center">
            <FaClipboardList className="mr-2" />
            <Link to="/orders" className="text-lg hover:text-gray-300">Orders</Link>
          </li>
          <li className="flex items-center">
            <FaBoxOpen className="mr-2" />
            <Link to="/show-items" className="text-lg hover:text-gray-300">Items</Link>
          </li>
          <li className="flex items-center">
            <FaUser className="mr-2" />
            <Link to="/profile" className="text-lg hover:text-gray-300">Profile</Link>
          </li>
          <li className="flex items-center">
            <FaBorderAll className="mr-2" />
            <Link to="/customer-dashboard" className="text-lg hover:text-gray-300">Customer Dashboard</Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto p-6">
        <li className="flex items-center">
          <FaSignOutAlt className="mr-2" />
          <button onClick={openModal} className="text-lg hover:text-gray-300">Logout</button>
        </li>
      </div>
      <Logout isOpen={isModalOpen} onClose={closeModal} onConfirm={handleSignOut} />
    </div>
  );
}

export default Sidebar;
