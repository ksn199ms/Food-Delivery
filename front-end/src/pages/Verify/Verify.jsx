import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const {url} = useContext(StoreContext)

    const navigate = useNavigate()

    const verifyPayment = async () => {
        let response = await axios.post(url+"/api/order/verify", {success,orderId})
        if(response.data.success){
            navigate('/myorders')
        }else{
            // alert(response.data.message)
            toast.error(response.data.message)
            navigate('/')
        }
    }



    useEffect(() => {
        verifyPayment()
    },[])

  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify