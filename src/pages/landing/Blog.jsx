import React from 'react'
import HeroBlog from '../../components/landing/blog/HeroBlog'
import Blogs from '../../components/landing/home/Blogs'
import NewBlog from '../../components/landing/blog/NewBlog'

const Blog = () => {
    return (
        <main className='flex flex-col'>
            <HeroBlog />
            <Blogs />
            <NewBlog/>
        </main>
    )
}

export default Blog