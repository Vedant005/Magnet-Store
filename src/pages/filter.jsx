import "./filter.css"
import { useData } from "../contexts/dataContext";
import { SORT_BY_PRICE ,SORT_BY_RANGE ,CLEAR_ALL_FILTERS,SORT_BY_RATING} from "../variables/variables.js";
import { useProduct } from "../contexts/productContext.js";
export default function Filter(){

const {filterProduct,dispatchFilter}=useData();
  const {choiceCategory}= useProduct();

 const ratingsArr = [4,3,2,1];


return(

        <div class="filter-container">
        <div>  
           <h2>FILTER</h2> 
           <hr/>
          < label
            onClick={() =>
              dispatchFilter({ type: CLEAR_ALL_FILTERS, payload: "" })
            }
          >
            Clear
          </label>
          <hr/>
        </div>
        

         <div>
           <p>SORT</p>
           <label >
               <input type= "radio"
                id ="lowtohigh"
                value="lowtohigh"
                className="checkbox"
                checked={filterProduct.sortBy === "lowtohigh"}
                onClick={(e) =>
                  dispatchFilter({ type: SORT_BY_PRICE, payload: e.target.value })
                  }
                />
           Price- Low To High
          
           </label>
       <br/>
           <label >
               <input type= "radio"
               className="checkbox"
               id="hightolow"
               value="hightolow"
               checked={filterProduct.sortBy === "hightolow"}
               onClick={(e) =>
                dispatchFilter({ type: SORT_BY_PRICE, payload: e.target.value })
                }
               />
           Price- High to Low
          
           </label>
           </div> 
           <hr/> 

           <div>
           <p>PRICE</p>
           <div className="price-range">
                                
                            <p>1000</p>
                            <p>2000</p>
                            < p>3000</p>
                            <p>4000</p>
                            <p>5000</p>
                            </div>
          {/* <label >  */}
               {/* <input type= "range" min="500" max="5000" value="5000"id="slider" step="any"
               className="price-range"
               name="price"
               /> */}
               <div>
               <input 
               type="range"
                min={1000} 
                max={5000}
                step="any"
                 value={filterProduct?.pricerange}
                // value={5000}
                 className="filter-range"
                 onChange={(e)=>
                dispatchFilter({
                    type :SORT_BY_RANGE,
                    payload: e.target.value
                                }) }
              />
              </div>
              
           </div> 
           <hr></hr>
          
    
       <p>CATEGORIES</p>
          <div class="categories">
           {choiceCategory?.map(({ _id, categoryName }) => (
           
            <label key={_id}>
              <input
                type="checkbox"
                key={categoryName}
                checked={filterProduct?.choiceCategory?.includes(categoryName)}
                onClick={() =>
                  dispatchFilter({
                    type: "FILTER_BY_CATEGORY",
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
<hr></hr>
     {/* <div class="categories">
           <p>BRANDS</p>
           <label>
               <input type="checkbox"  classname="check"/>
              MITLON
           </label>
           <label>
               <input type="checkbox"  classname="check"/>
              BOROSIL
           </label>
           <label>
               <input type="checkbox"  classname="check"/>
              TREO
           </label>
           <label>
               <input type="checkbox"  classname="check"/>
              CLAY CRAFT
           </label>



       </div> */}
        <p>RATINGS</p>  
       <div className="ratings">
       {ratingsArr?.map((rat) => {
            return (
              <label key={rat}>
                <input
                  type="radio"
                  name="rating"
                  value={rat}
                  checked={Number(filterProduct?.ratings) === Number(rat)}
                  onChange={(e) =>
                    dispatchFilter({
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