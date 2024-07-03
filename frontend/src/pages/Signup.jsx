import React,{useState} from "react";
import Spinner from "../components/Spinner";
import { Link,useNavigate } from 'react-router-dom'
const Signup = () => {
  const navigate=useNavigate();
  const [formData,setFormData]=useState([]);
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };
  const handleSubmit=async(e)=>{
    try {
      e.preventDefault();
      setLoading(true);
      setError(null);
      const res=await fetch('/api/user/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      if(data.success===false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/')
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }
  return (
     loading ? (<Spinner/>):(
    <div className="p-3 max-w-lg mx-auto mt-7">
      <h1 className="text-3xl text-center font-semibold my-7">
        Sign Up now to order
      </h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
          onChange={handleChange}
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
        <button onClick={handleSubmit} className="bg-yellow-500 p-3 rounded-lg text-white font-semibold uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
    )
  );
};

export default Signup;
