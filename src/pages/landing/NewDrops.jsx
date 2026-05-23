import HeroNewDrops from '../../components/landing/newdrops/HeroNewDrops'
import SecondHero from '../../components/landing/home/SecondHero'
import FeaturedEngagement from '../../components/landing/newdrops/FeaturedEngagement'
import NewDropGun from '../../components/landing/newdrops/NewDropGun'
import MostSellerProduct from '../../components/landing/home/MostSellerProduct'
import NewBlog from '../../components/landing/blog/NewBlog'

const NewDrops = () => {
    return (
        <div>
            <HeroNewDrops />
            <SecondHero />
            <FeaturedEngagement />
            <NewDropGun />
            <MostSellerProduct />
            <NewBlog/>


        </div>
    )
}

export default NewDrops
