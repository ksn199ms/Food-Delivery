import React, { useEffect, useState } from 'react'
import './List.css'

import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data)
    if(response.data.success) {
      setList(response.data.data)
    }else{
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    if(response.data.success) {
      // alert(confirm('are you want to delete?'))
      toast.success(response.data.message)
      fetchList()
    }else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {
          list.map((item,index) => (
            <div key={index} className="list-table-format">
              <p><img src={`${url}/images/`+item.image} alt="" /></p>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => {if(confirm('Are you want to delete this item?')) removeFood(item._id)}} className='cursor'>X</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default List