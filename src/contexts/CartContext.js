import { createContext, useState ,useContext} from "react"


export const CartContext = createContext();
function CartProvider({ children }){

    const [cart, setCart] = useState([]);
    


    const addToCart = (product) => {
        setCart([...cart, product]);
    
    }

    const removeFromCart = (product) => {
        setCart([...cart].filter((item) => item !== product))
    }

   
    const productQuantityIncrement = (product) => {
        setCart([...cart].map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        ))
    }
    const productQuantityDecrement = (product) => {
        const cartWithDecrementedQuantityOfProducts = [...cart].map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity - 1 } : item
        )
        setCart(cartWithDecrementedQuantityOfProducts)
    }


    let { priceOfAllItems, totalPriceDiscount, totalPrice } = cart.reduce((acc, { originalPrice, price, quantity }) => {
        acc.priceOfAllItems += originalPrice * quantity;
        acc.totalPriceDiscount += (originalPrice * quantity - price * quantity);
        
        acc.totalPrice +=  price * quantity;
        return acc;
    }, {
        priceOfAllItems: 0,
        totalPriceDiscount: 0,
     totalPrice: 0
    })

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

    return (
        <div>
    <CartContext.Provider value={{ cart, totalItems, addToCart, productQuantityIncrement, productQuantityDecrement, removeFromCart, priceOfAllItems, totalPriceDiscount, totalPrice ,setCart}}>
        {children}
    </CartContext.Provider>
</div>
    )
}

const useCart =()=>
  useContext(CartContext);

 export{CartProvider,useCart};