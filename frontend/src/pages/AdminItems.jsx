import React, { useState, useEffect } from "react";
import ItemTable from "../components/ItemTable";
import { useSnackbar } from "notistack";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const AdminItems = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemsError, setItemsError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openModal = (item) => {
    setIsModalOpen(true);
    setItemToDelete(item);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  useEffect(() => {
    const handleItems = async () => {
        try {
          setItemsError(false);
          const res = await fetch(`/api/item/get-all`);
          const data = await res.json();
          if (data.success === false) {
            enqueueSnackbar("Some error occurred", { variant: "error" });
            return;
          }
          setItems(data);
          setFilteredItems(data);
        } catch (error) {
          enqueueSnackbar("Some error occurred", { variant: "error" });
          setItemsError(true);
        }
      };
    handleItems();
  }, []);

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredData = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery)
    );
    setFilteredItems(filteredData);
  };

  const handleDelete = async () => {
    try {
        const id=itemToDelete._id;
      const res = await fetch(`/api/item/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        enqueueSnackbar("Failed to delete item", { variant: "error" });
        return;
      }
      setItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
      setFilteredItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
      enqueueSnackbar("Item deleted successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to delete item", { variant: "error" });
    }
    closeModal();
  };

  return (
    <div className="flex">
    <Sidebar />
    <div className="mx-auto ml-80">
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search items..."
          className="p-3 border mt-6 border-gray-300 rounded-lg w-96"
          onChange={handleSearchChange}
        />
      </div>
      <ItemTable items={filteredItems} handleDelete={openModal} />
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <MdDelete
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Delete Item
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this item? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Link to={'/add-item'} className="flex items-center justify-center">
        <button className="p-3 mb-6 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95">ADD ITEM</button>
      </Link>
    </div>
    </div>
  );
};

export default AdminItems;
