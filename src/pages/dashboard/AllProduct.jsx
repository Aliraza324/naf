import React from 'react'
import { useLocation } from 'react-router-dom'
import MainShop from '../../components/dashboard/MainShop'

const AllProduct = () => {
  const location = useLocation()
  const selectedProductId = location.state?.selectedProductId

  return (
    <div>
      <MainShop selectedProductId={selectedProductId} />
    </div>
  )
}

export default AllProduct