
import './App.css'
import { Route , Routes} from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import SingleProductPage from './pages/SingleProductPage'

function App() {
 

  return (
    <>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products"element={<ProductPage/>}/>
      <Route path="/products:productId" element={<SingleProductPage/>}/>

     </Routes>
    </>
  )
}

export default App
