import React from 'react'
import Transactions from '../../components/dashboard/Transactions'
import RecentTransactions from '../../components/dashboard/RecentTransactions'

const Payment = () => {
  return (
    <div>
        <Transactions/>
        <RecentTransactions/>
    </div>
  )
}

export default Payment