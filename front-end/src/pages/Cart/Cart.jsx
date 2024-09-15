import React, { useContext } from 'react'
import './Cart.css'
import { assets } from '../../assets/assets'

import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const {cartItems,food_list,removeFromCart,getTotalCartAmount ,url} = useContext(StoreContext)

  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item,index) => {
            if(cartItems[item._id]>0){
              return (
                <div>
                  <div className="cart-items-title cart-items-item" key={index}>
                    <img src={url+'/images/'+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price*cartItems[item._id]}</p>
                    <img className='cross' onClick={() => removeFromCart(item._id)} src={assets.remove_icon_red} alt="" />
                  </div>
                  <hr />
                </div>
              )
            }
          })  
        }
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() > 0 ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() > 0 ? getTotalCartAmount()+2 : 0}</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
        </div>
      

      <div className="cart-promocode">
        <div>
          <p>Have a promo code?</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Cart