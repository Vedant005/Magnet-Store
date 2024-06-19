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
      <div className='Header-component'>
        <Header />
      </div>
      <div className='flex-row'>
        <div className='filter'>
          <Filter/>
        </div>
        <div className='product'>
          {sortByPriceFilteredProducts.length > 0 ? (
            <div>
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
