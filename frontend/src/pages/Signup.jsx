import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../app/user/userSlice.js';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(loginFailure(data.message));
        return;
      }
      console.log(data);
      dispatch(loginSuccess(data));
      navigate('/home');
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    isLoading ? (
      <Spinner />
    ) : (
      <div className="p-3 max-w-lg mx-auto mt-7">
        <h1 className="text-3xl text-center font-semibold my-7">
          Sign Up now to order
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            className="border p-3 rounded-lg focus:outline-none"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg focus:outline-none"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-500"></div>
            <span className="mx-4 text-gray-600">or</span>
            <div className="flex-grow border-t border-gray-500"></div>
          </div>
          <input
            type="number"
            disabled
            placeholder="phone number"
            className="border p-3 rounded-lg focus:outline-none"
            id="phone"
          />
          <button
            type="submit"
            className="bg-slate-700 p-3 rounded-lg text-white font-semibold uppercase hover:opacity-95 disabled:opacity-80"
          >
            Sign Up
          </button>
        </form>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    )
  );
};

export default Signup;
