import {
BrowserRouter, Routes, Route
} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Users from './pages/Users';
import Products from './pages/Products';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Login2 from './components/Login2';
import ProductList from './components/ProductList';
import ProductTes from './components/ProductTes';
import ProductCard from './components/ProductCard';
import SlideBar from './components/SlideBar';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login2/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/users' element={<Users/>} />
          <Route path='/users/add' element={<AddUser/>} />
          <Route path='/users/edit/:id' element={<EditUser/>} />
          {/* ganti element */}
          <Route path='/products' element={<Products/>} /> 
          <Route path='/products/add' element={<AddProduct/>} />
          <Route path='/products/edit/:id' element={<EditProduct/>} />
          <Route path='/login2' element={<Login2/>} />
          <Route path='/fknajdnf,akd' element={<SlideBar/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
