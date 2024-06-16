
import './App.css'
import { Route , Routes} from 'react-router-dom'
import Home from './pages/Home'
import ProductCard from './components/ProductCard'

function App() {
 

  return (
    <>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<ProductCard/>}/>
     </Routes>
    </>
  )
}

export default App
