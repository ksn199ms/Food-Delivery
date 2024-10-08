import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'


import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

  const [data,setData] = useState({
    firstName :'',
    lastName :'',
    email :'',
    street :'',
    city :'',
    state :'',
    zipCode :'',
    country :'',
    phone :''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData({ ...data, [name]: value })
  }


  const onPlaceOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2  // Including delivery charge
    };
  
    try {
      // Sending order data to the backend to create an order and Razorpay order
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
  
      if (response.data.success) {
        const { orderId, amount, currency, frontendSuccessUrl, frontendCancelUrl } = response.data;
  
        // Initialize Razorpay payment gateway
        const options = {
          key: "rzp_test_qcXXbOD2r7tS8H", // Enter your Razorpay Key ID
          amount: amount,  // Amount in paisa
          currency: currency,
          name: "Team199",  // Add your company name here
          description: "Order Payment",
          order_id: orderId,  // This is the Razorpay order ID returned from the backend
          handler: function (response) {
            // On successful payment, redirect to success URL
            window.location.replace(frontendSuccessUrl);
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,  // You can add pre-filled customer details here
            email: data.email,  // Pre-filled email
            contact: data.phone  // Pre-filled contact number
          },
          theme: {
            color: "#3399cc"
          },
          modal: {
            ondismiss: function () {
              // On payment modal close, redirect to cancel URL
              window.location.replace(frontendCancelUrl);
            }
          }
        };
  
        // Open the Razorpay payment popup
        const rzp = new Razorpay(options);
        rzp.open();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an issue placing your order.");
    }
  };

  const navigate = useNavigate()

  useEffect(() => {
    if(!token){
      navigate('/cart')
    }else if(getTotalCartAmount() === 0){
      navigate('/cart')
      toast.warning("please add items to cart")
    }
  },[token])
  

  return (
    <form onSubmit={onPlaceOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' required />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' required />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address"  required />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="street address" required />
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip code' required />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'  required/>
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'   required />
      </div>
      <div className="place-order-right">
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
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder