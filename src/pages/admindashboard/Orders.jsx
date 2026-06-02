import React from 'react'
import OrderCard from '../../components/admindashboard/OrderCard'
import OrderTable from '../../components/admindashboard/OrderTable'

const Orders = () => {
  return (
    <div className="p-4 max-w-7xl w-full mx-auto">
      <OrderCard />
      <OrderTable />
    </div>
  )
}

export default Orders