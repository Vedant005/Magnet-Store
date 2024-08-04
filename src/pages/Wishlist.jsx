import Header from "../components/Header";
import { WishlistContext } from "../contexts/wishlistContext";
import { useContext } from "react";
import { FaHeart, FaStar } from "react-icons/fa";

export default function Wishlist() {
  const { wishList } = useContext(WishlistContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Wishlist Items: {wishList.length}
        </h1>
        {wishList.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishList.map((item) => {
              const { _id, title, price, ratings, image } = item;
              return (
                <div
                  key={_id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-2 right-2 text-red-500">
                      <FaHeart size={24} />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 uppercase">BRAND</p>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      {title}
                    </h2>
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-bold text-gray-800 mr-2">
                        {price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        MRP: {price}
                      </span>
                    </div>
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < ratings ? "text-yellow-400" : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
