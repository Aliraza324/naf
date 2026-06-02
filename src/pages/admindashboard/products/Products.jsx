import React from 'react'
import ProductBar from '../../../components/admindashboard/product/ProductBar'
import ProductTable from '../../../components/admindashboard/product/ProductTable'

const Products = () => {
  return (
    <div>
      <ProductBar />
      <div className="mx-auto max-w-7xl px-4 pb-10">
        <ProductTable />
      </div>
    </div>
  )
}

export default Products