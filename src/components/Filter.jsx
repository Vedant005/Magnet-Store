import React, { useContext, useReducer } from 'react'
import { SORT_BY_PRICE,SORT_BY_RANGE,FILTER_BY_CATEGORY, SEARCH_PRODUCT ,SORT_BY_RATING ,CLEAR_ALL_FILTERS} from "../variables/variables.js";

import { FilterContext } from '../contexts/filterContext'
import { ProductContext } from '../contexts/productContext';

function Filter() {
  const {productState} = useContext(ProductContext);
  const {filterState,filterDispatch}=useContext(FilterContext);
 
  const ratingsArr = [4,3,2,1];
  // console.log(filterState)
  return (
     <div className='flex-col'>
       <div className='flex gap-5 my-3 '>
        <h1 className='text-md font-semibold'>FILTERS</h1>
        <div className=''>
        <button onClick={()=>
          filterDispatch({type:CLEAR_ALL_FILTERS, payload:""})
        }className='text-md font-semibold'>CLEAR</button>
        </div>
      
       </div>
       <div className='my-4'>
              <h2 className='text-md font-semibold'>SORT</h2>
              <label >
               <input type= "radio"
                id ="lowtohigh"
                value="LTH"
                className="checkbox"
                checked={filterState.sortBy === "LTH"}
                onClick={(e) =>
                  filterDispatch({ type: SORT_BY_PRICE, payload: e.target.value })
                  }
                />
           Price- Low To High
          
           </label>
           <p className='my-1'></p>
           <label >
               <input type= "radio"
                id ="hightolow"
                value="HTL"
                className="checkbox"
                checked={filterState.sortBy === "HTL"}
                onClick={(e) =>
                  filterDispatch({ type: SORT_BY_PRICE, payload: e.target.value })
                  }
                />
           Price - High To Low
          
           </label>

       </div>
       <h2 className='text-md font-semibold'>PRICE RANGE</h2>
       <div className='price my-4'>
              
        <div className="flex gap-3">
                                
                            <p>1K</p>
                            <p>2K</p>
                            < p>3K</p>
                            <p>4K</p>
                            <p>5K</p>
         </div>
         <div>
               <input 
               type="range"
                min="1000"
                max="5000"
                step="1000"
                 value={filterState?.priceRange ||5000}
                // value={5000}
                 className="filter-range"
                 onChange={(e)=>
                filterDispatch({
                    type :SORT_BY_RANGE,
                    payload: e.target.value
                                }) }
              />
              </div>

       </div>
       <h2 className='text-md font-semibold'>CATEGORIES</h2>
       <div className='flex-col my-5'>

       {productState?.categories?.map(({ _id, categoryName }) => (
           
           <label key={_id} className='flex items-center gap-2'>
             <input
               type="checkbox"
               key={categoryName}
               checked={filterState?.categoryFilter?.includes(categoryName)}
               onClick={() =>
                 filterDispatch({
                   type: FILTER_BY_CATEGORY,
                   payload: categoryName,
                 })
               }
             />
             <div className="category-name">
             {categoryName}
             </div>
           </label>
           
         ))}

       </div>
       <h2 className='text-md font-semibold'>RATINGS</h2>
       <div className='flex flex-col '>

       {ratingsArr?.map((rating) => {
            return (
              <label key={rating} className='flex items-center gap-2'>
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={Number(filterState?.ratings) === Number(rating)}
                  onChange={(e) =>
                    filterDispatch({
                      type: SORT_BY_RATING,
                      payload: e.target.value,
                    })
                  }
                />
                {rating}⭐ and above
              </label>
            );
          })}


       </div>
     </div>
  )
}

export default Filter