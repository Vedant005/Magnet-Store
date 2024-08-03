import { createContext, useState } from "react";

export const WishlistContext = createContext();
export const WishlistProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);

  const addToWishListHandler = (product) => {
    setWishList((prevWishList) => {
      if (prevWishList.some((item) => item._id === product._id)) {
        return prevWishList.filter((item) => item._id !== product._id);
      } else {
        return [...prevWishList, product];
      }
    });
  };

  return (
    <WishlistContext.Provider
      value={{ wishList, setWishList, addToWishListHandler }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
