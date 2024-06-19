import React, { useContext } from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import ProductCard from '../components/ProductCard';
import { FilterContext } from '../contexts/filterContext';

export default function ProductPage() {
  const { sortByPriceFilteredProducts } = useContext(FilterContext);

  console.log('Products in ProductPage:', sortByPriceFilteredProducts); // Check products in the page

  return (
    <div className='main'>
      <div className='my-16'>
        <Header />
      </div>
      <div className='flex'>
        <div className='filter w-1/4 p-4 mx-5'>
          <Filter />
        </div>
        <div className='product w-3/4 p-4'>
          {sortByPriceFilteredProducts.length > 0 ? (
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 '>
              {sortByPriceFilteredProducts?.map((product) => (
                <ProductCard key={product._id} {...product} />
              ))}
            </div>
          ) : (
            <h4>There are no products for selected filters.</h4>
          )}
        </div>
      </div>
    </div>
  );
}
