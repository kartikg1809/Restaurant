import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { useSnackbar } from "notistack";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        enqueueSnackbar("Some error occurred", { variant: "error" });
        return;
      }
      enqueueSnackbar("User added successfully", { variant: "success" });
      navigate("/admin-dashboard");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Some error occurred", { variant: "error" });
      setError("An error occurred. Please try again.");
    }
  };
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Sidebar />
      <div className="p-3 max-w-lg mx-auto items-center">
        <h1 className="text-3xl text-center font-semibold my-7">Add User</h1>
        <FaUser className="mx-auto pb-4 text-8xl" />
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
          <div className="">
            <select
              id="role"
              name="role"
              className="border p-3 rounded-lg"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select role</option>
              {currentUser && currentUser.role === "admin" && (
                <option value="admin">Admin</option>
              )}
              <option value="staff">Staff</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-slate-700 p-3 rounded-lg text-white font-semibold uppercase hover:opacity-95 disabled:opacity-80"
          >
            Add user
          </button>
        </form>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default Profile;
