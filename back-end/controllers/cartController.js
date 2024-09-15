import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
            await userData.save();
        }else{
            cartData[req.body.itemId] += 1;
            await userData.save();
        }
        await userModel.findByIdAndUpdate({ _id: req.body.userId }, { cartData: cartData });
        res.json({ success: true, message: "Item added to cart successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate({ _id: req.body.userId }, { cartData: cartData });
        res.json({ success: true, message: "Item removed from cart successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;
        res.json({ success: true, data: cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
}

export { addToCart, removeFromCart, getCart }