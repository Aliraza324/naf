import React from 'react'
import PaymentCard from '../../components/admindashboard/PaymentCard'
import PaymentTable from '../../components/admindashboard/PaymentTable'

const Payment = () => {
  return (
    <div className="space-y-6">
      <PaymentCard />
      <PaymentTable />
    </div>
  )
}

export default Payment