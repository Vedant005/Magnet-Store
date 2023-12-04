import "./Product.css"
import { useData } from "../contexts/dataContext";
import { SORT_BY_PRICE ,SORT_BY_RANGE} from "../variables/variables.js";
import { useProduct } from "../contexts/productContext.js";
export default function Filter(){

const {filterProduct,dispatchFilter}=useData();
  const {choiceCategory}= useProduct();
return(

        <div class="filter-container">
        <div>  
           <h2>FILTER</h2> 
           <p>CLEAR ALL</p>
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
                //  value={filterProduct?.pricerange}
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
       <div class="categories">
           <p>CATEGORIES</p>
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
              {categoryName}
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
       <div>
         <p>RATINGS</p>   
         <label>
           <input type="radio" class="ratings"/>
           4 Stars & above
           </label>
           <label>
           <input type="radio" class="ratings"/>
           3 Stars & above
           </label>
           <label>
           <input type="radio" class="ratings"/>
           2 Stars & above
           </label>
           <label>
           <input type="radio" class="ratings"/>
           1 Stars & above
           </label>
      </div>
      
     
     
       </div>
    )
}