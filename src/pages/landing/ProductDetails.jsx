import PopularBrand from '../../components/landing/home/PopularBrand'
import NewProduct from '../../components/product/NewProduct'
import ProductsDetails from '../../components/product/ProductsDetails'
import ProductSpecifications from '../../components/product/ProductSpecifications'

const ProductDetails = () => {
  return (
    <>
      <ProductsDetails />
      <ProductSpecifications />
      <NewProduct />
      <PopularBrand/>

    </>
  )
}

export default ProductDetails
