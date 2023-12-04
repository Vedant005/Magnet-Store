


import { createContext, useState ,useContext} from "react";


export const WishlistContext = createContext();
 export const WishlistProvider = ({ children }) => {

    const [wishList, setWishList] = useState([]);

    const addToWishListHandler = (product) => {
        wishList.find((item) => item._id === product._id) ? setWishList([...wishList].filter((item) => item._id !== product._id)) : setWishList([...wishList, product]);


    }



    return (<WishlistContext.Provider value={{ wishList,setWishList, addToWishListHandler }}>
        {children}
    </WishlistContext.Provider>)


}

const useWish =()=>
  useContext(WishlistContext);

  export{useWish};