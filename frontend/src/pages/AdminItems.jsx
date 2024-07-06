import React, { useState, useEffect } from 'react';
import ItemTable from '../components/ItemTable';
import { useSnackbar } from 'notistack';

const AdminItems = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [itemsError, setItemsError] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        handleItems();
    }, []);

    const handleItems = async () => {
        try {
            setItemsError(false);
            const res = await fetch(`/api/item/get`);
            const data = await res.json();
            if (data.success === false) {
                enqueueSnackbar("Some error occurred", { variant: "error" });
                setShowListingError(true);
                return;
            }
            setItems(data);
            setFilteredItems(data);
        } catch (error) {
            enqueueSnackbar("Some error occurred", { variant: "error" });
            setItemsError(true);
        }
    }

    const handleSearchChange = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const filteredData = items.filter(item =>
            item.name.toLowerCase().includes(searchQuery) ||
            item.category.toLowerCase().includes(searchQuery)
        );
        setFilteredItems(filteredData);
    }

    const handleEdit = () => {
        // Implement edit functionality as needed
    }

    return (
        <div className="p-8">
            <div className="mb-4 flex justify-center ">
                <input
                    type="text"
                    placeholder="Search items..."
                    className="p-3 border border-gray-300 rounded-lg w-96"
                    onChange={handleSearchChange}
                />
            </div>
            <ItemTable items={filteredItems} handleEdit={handleEdit} />
        </div>
    );
}

export default AdminItems;
