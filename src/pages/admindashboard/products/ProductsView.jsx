import React from 'react'
import MoreDetails from '../../../components/admindashboard/product/MoreDetails'
import MoreDetailsTable from '../../../components/admindashboard/product/MoreDetailsTable'

const ProductsView = () => {
  return (
    <div className="space-y-6">
      {/* abhvbsivbs */}
      <MoreDetails />
      <div className="mx-auto w-full max-w-7xl px-4 pb-12">
        <MoreDetailsTable />
      </div>
    </div>
  )
}

export default ProductsView