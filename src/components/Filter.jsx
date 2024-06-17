import React, { useContext, useReducer } from 'react'
import { SORT_BY_PRICE,SORT_BY_RANGE,FILTER_BY_CATEGORY, SEARCH_PRODUCT ,SORT_BY_RATING ,CLEAR_ALL_FILTERS} from "../variables/variables.js";

import { FilterContext } from '../contexts/filterContext'
import { ProductContext } from '../contexts/productContext';

function Filter() {
  const {productState} = useContext(ProductContext);
  const {filterState,filterDispatch}=useContext(FilterContext);
 console.log(filterState);

  const ratingsArr = [4,3,2,1];
  return (
     <div className='flex-col'>
       <div className='headers & clear'>
        <h1>FILTERS</h1>
        <button onClick={()=>
          filterDispatch({type:CLEAR_ALL_FILTERS, payload:""})
        }>CLEAR</button>

       </div>
       <div className='sort'>
              <h2>SORT</h2>
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
       <div className='price'>
              <h2>Price Range</h2>
        <div className="price-range">
                                
                            <p>1000</p>
                            <p>2000</p>
                            < p>3000</p>
                            <p>4000</p>
                            <p>5000</p>
         </div>
         <div>
               <input 
               type="range"
                min={1000} 
                max={5000}
                step="any"
                 value={filterState?.priceRange}
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
       <div className='categories'>

       {productState?.categoryFilter?.map(({ _id, categoryName }) => (
           
           <label key={_id}>
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
       <div className='ratings'>

       {ratingsArr?.map((rat) => {
            return (
              <label key={rat}>
                <input
                  type="radio"
                  name="rating"
                  value={rat}
                  checked={Number(filterState?.ratings) === Number(rat)}
                  onChange={(e) =>
                    filterDispatch({
                      type: SORT_BY_RATING,
                      payload: e.target.value,
                    })
                  }
                />
                {rat}⭐ and above
              </label>
            );
          })}


       </div>
     </div>
  )
}

export default Filter