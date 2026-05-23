import { useParams, Link } from 'react-router-dom'
import { blogsData } from '../../data/blogsData'
import HeroDetails from '../../components/landing/blogdetails/HeroDetails'
import BlogMoreDetails from '../../components/landing/blogdetails/BlogMoreDetails'
import RelatedProduct from '../../components/product/RelatedProduct'

const BlogsDetails = () => {
  const { slug } = useParams()
  const blog = blogsData.find((b) => b.slug === slug)

  if (!blog) {
    return (
      <main className='flex min-h-screen flex-col items-center justify-center bg-page text-white px-4'>
        <p className='text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-4'>404 – Not Found</p>
        <h1 className='text-4xl font-black mb-6'>Blog not found</h1>
        <Link to='/blog' className='brand-red-gradient rounded-[6px] px-8 py-3.5 text-xs font-black uppercase tracking-wider text-white'>
          Back to Blog
        </Link>
      </main>
    )
  }

  return (
    <main className='flex flex-col'>
      <HeroDetails blog={blog} />
      <BlogMoreDetails blog={blog} />
      <RelatedProduct/>
    </main>
  )
}

export default BlogsDetails
