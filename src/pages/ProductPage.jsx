import React from 'react'
import Header from '../components/Header'
import Filter from '../components/Filter'
import ProductCard from '../components/ProductCard'

function ProductPage() {
  return (
    <div className='main'>

        <div className='Header-component'>
            <Header/>
        </div>
    <div className='flex'>
        <div className='filter'>

            <Filter/>

        </div>
        <div className='product'>
            <ProductCard/>
        </div>
    </div>
    </div>
  )
}

export default ProductPage