import React, { useContext } from 'react'
import Header from '../components/Header'
import Filter from '../components/Filter'
import ProductCard from '../components/ProductCard'
import { FilterContext } from '../contexts/filterContext'

function ProductPage() {
    const {sortByPriceFilteredProducts} =useContext(FilterContext)

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
            {sortByPriceFilteredProducts.length > 0 ? (
                <div>
                    {sortByPriceFilteredProducts?.map((products)=>{
                        return(
                            <ProductCard product={products}/>
                        )
                    })}
                    </div>
            ): (
                <h4>There are no products for selected filters.</h4>
              )}
            <ProductCard/>
        </div>
    </div>
    </div>
  )
}

export default ProductPage