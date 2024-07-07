import React, { useState, useEffect } from "react";
import { storage } from "../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { MdDeleteOutline } from "react-icons/md";
import { useSnackbar } from 'notistack';
import { useParams, useNavigate } from "react-router-dom";

const UpdateItem = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState(null);
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    isVeg: true,
    isAvailable: true,
    image: "",
  });

  const handleImageSubmit = async () => {
    if (!files) {
      setImageUploadError("Please select an image to upload.");
      return;
    }
    setUploading(true);
    const file = files[0];
    const imageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
      setFormData(prevData => ({ ...prevData, image: url }));
      setImageUploadError("");
    } catch (error) {
      console.error("Image upload failed: ", error);
      setImageUploadError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      setImageUploadError("Please upload an image before submitting.");
      return;
    }
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/item/update/${params.itemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        enqueueSnackbar(data.message, { variant: "error" });
        return setError(data.message);
      }
      enqueueSnackbar("Item Updated successfully", { variant: "success" });
      navigate('/show-items');
    } catch (error) {
      enqueueSnackbar("Some error occurred", { variant: "error" });
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "radio") {
      const id = e.target.id;
      const value = e.target.value === "true";
      setFormData({
        ...formData,
        [id]: value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      const itemId = params.itemId;
      const res = await fetch(`/api/item/get/${itemId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
      setImageUrl(data.image);
    };
    fetchItem();
  }, [params.itemId]);

  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Update Item</h1>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex-1 flex flex-col gap-6 mt-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Price"
            className="border p-3 rounded-lg"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <div>
            <label className="block text-sm font-bold mb-2">Category</label>
            <select
              id="category"
              name="category"
              className="border p-3 rounded-lg"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Appetizers">Appetizers</option>
              <option value="Main Courses">Main Courses</option>
              <option value="Desserts">Desserts</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="true"
                  id="isVeg"
                  checked={formData.isVeg}
                  onChange={handleChange}
                />
                <span className="ml-2">Vegetarian</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="false"
                  id="isVeg"
                  checked={!formData.isVeg}
                  onChange={handleChange}
                />
                <span className="ml-2">Non-Vegetarian</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Available</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="true"
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="false"
                  id="isAvailable"
                  checked={!formData.isAvailable}
                  onChange={handleChange}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <div className="mb-6">
            <p className="font-semibold p-2 text-lg">Image</p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
                accept="image/*"
              />
              <button
                onClick={handleImageSubmit}
                type="button"
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <p className="text-red-600 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.image && (
              <div className="flex justify-between p-2 border items-center my-2">
                <img
                  src={imageUrl}
                  alt="item-image"
                  className="w-32 h-24 object-contain rounded-lg mx-auto"
                />
                <button
                  onClick={() => setFormData({...formData,image:""})}
                  type="button"
                  className="p-2 text-red-700 rounded-lg text-2xl uppercase hover:opacity-95"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Item"}
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default UpdateItem;
