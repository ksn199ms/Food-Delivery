import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'

import axios from 'axios'

const Add = () => {

  const url = 'http://localhost:4000';

  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: '',
    description: '',
    category: 'Salad',
    price: '',
  })

  const onChangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('price', Number(data.price))
    formData.append('image', image)

    const response = await axios.post(`${url}/api/food/add`, formData)
    if(response.data.success) {
      setData({
        name: '',
        description: '',
        category: 'Salad',
        price: '',
      })
      setImage(false)
    }else{
      console.log(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
          </label>
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangehandler} value={data.name}  type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangehandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangehandler} name="category" id="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure-Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="price flex-col">
            <p>Product price</p>
            <input onChange={onChangehandler} value={data.price} type="number" name="price" placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add