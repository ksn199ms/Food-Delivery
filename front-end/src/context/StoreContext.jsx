import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null)


const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const url = import.meta.env.VITE_BACK_END_URL

    const [token, setToken] = useState("")

    const [food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
            await axios.post(url+"/api/cart/add", {itemId},{headers : {token}})
        }
        if(!token){
            setCartItems([])
            toast.error("please login first")
        }
    }


    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        if(token){
            await axios.post(url+"/api/cart/remove", {itemId},{headers : {token}})
        }
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += (itemInfo.price * cartItems[item])
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{}, {headers : {token}})
        setCartItems(response.data.data);
    }


    useEffect(() => {
        async function fetchData() {
            await fetchFoodList()

            const token = localStorage.getItem("token")
            if (token) {
                setToken(token)
                await loadCartData(token)
            }
        }
        fetchData()
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;