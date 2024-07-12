import React from 'react'
import Sidebar from '../components/Sidebar'
import OrderTable from '../components/OrderTable'
const Orders = () => {
  return (
    <div className='flex'>
        <Sidebar />
        <div className='mx-auto'>
            <OrderTable />
        </div>
    </div>
  )
}

export default Orders