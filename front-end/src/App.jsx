import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/Placeorder'
import LoginPopup from './components/LoginPopup/LoginPopup'

import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { useContext } from 'react'
import { StoreContext } from './context/StoreContext'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  const {token} = useContext(StoreContext)

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
    <div className='app'>
      <div>
        <ToastContainer/>
        <Navbar setShowLogin={setShowLogin}/>
      </div>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        {
          token ? <Route path='/cart' element={<Cart/>}/> 
          :  <></>
        }
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App