import React from 'react'

const AddItem = () => {
  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Add Item</h1>
      <form className="flex gap-4">
        <div className="flex-1 flex flex-col gap-6 mt-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            required
          />
          <input
            type="text"
            placeholder="Price"
            className="border p-3 rounded-lg"
            id="price"
            required
          />
          <div className="">
            <label className="block text-sm font-bold mb-2">Category</label>
            <select
              id="category"
              name="category"
              className="border p-3 rounded-lg"
              required
            >
              <option value="">Select a category</option>
              <option value="appetizers">Appetizers</option>
              <option value="main-courses">Main Courses</option>
              <option value="desserts">Desserts</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          <div className="">
            <label className="block text-sm font-bold mb-2">Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input type="radio" name="type" value="vegetarian" />
                <span className="ml-2">Vegetarian</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="type" value="non-vegetarian" />
                <span className="ml-2">Non-Vegetarian</span>
              </label>
            </div>
          </div>

          <div className="">
            <label className="block text-sm font-bold mb-2">Available</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input type="radio" name="availability" value="yes" />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="availability" value="no" />
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
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
                accept="image/*"
              />
              <button
                type="button"
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              >
                Upload
              </button>
            </div>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Add Item
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddItem
