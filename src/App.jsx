
import './App.css'
import { Route , Routes} from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import SingleProductPage from './pages/SingleProductPage'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'

function App() {
 

  return (
    <>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products"element={<ProductPage/>}/>
      <Route path="/products/:productId" element={<SingleProductPage/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/wishlist" element={<Wishlist/>}/>



     </Routes>
    </>
  )
}

export default App
