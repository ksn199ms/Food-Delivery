import React, { useContext, useState } from 'react'
import './Navbar.css'

import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

import {toast} from 'react-toastify'

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("")

    const {getTotalCartAmount,token, setToken} = useContext(StoreContext)

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
        toast.success("Logged out successfully")
    }

    const navigateTo = (section) => {
        navigate(`/#${section}`)
    }

  return (
    <div className='navbar'>
        {/* <img src={assets.logo} alt="" />  */}
        <Link to={"/"}><h1  className='logo'>TastyTrack.</h1></Link>
        <ul className="navbar-menu">
            <Link to={"/"} onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
            <a href='#explore-menu' onClick={() => {setMenu("menu"); navigateTo('explore-menu')}} className={menu === "menu" ? "active" : ""}>menu</a>
            <a href='#app-download' onClick={() => {setMenu("mobile-app"); navigateTo('app-download')}} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
            <a href='#footer' onClick={() => {setMenu("contact-us"); }} className={menu === "contact-us" ? "active" : ""}>contact us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                {
                    token ? <div><Link to={"/cart"}><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
                    </div> 
                    : <img onClick={() => toast.error("Please login first")} src={assets.basket_icon} alt="" />
                }
                
            </div>
            {!token ? <button onClick={() => setShowLogin(true)}>Login</button> 
            : <div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className="nav-profile-dropdown">
                    <li><img src={assets.bag_icon} alt="" /> <p onClick={() => navigate("/myorders")} >Orders</p></li>
                    <hr />
                    <li onClick={logout}><img src={assets.logout_icon} alt="" /> <p>Logout</p></li>
                </ul>
            </div> }
            
        </div>
    </div>
  )
}

export default Navbar