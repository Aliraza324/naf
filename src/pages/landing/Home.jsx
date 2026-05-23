import Blogs from '../../components/landing/home/Blogs'
import FeaturedCategories from '../../components/landing/home/FeaturedCategories'
import Hero from '../../components/landing/home/Hero'
import MostSellerProduct from '../../components/landing/home/MostSellerProduct'
import Performance from '../../components/landing/home/Performance'
import PopularBrand from '../../components/landing/home/PopularBrand'
import SecondHero from '../../components/landing/home/SecondHero'

const Home = () => {
  return (
    <main>
      <Hero />
      <SecondHero />
      <FeaturedCategories />
      <MostSellerProduct />
      <Performance />
      <PopularBrand/>
      <Blogs />


      
    </main>
  )
}

export default Home
