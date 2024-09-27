


import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";



// Placing user order from front-end
const placeOrder = async (req, res) => {

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET_KEY
    });


    const frontend_url = 'https://food-delivery-front-end-vcul.onrender.com';

    try {
        // Create a new order in your database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();

        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate({ _id: req.body.userId }, { cartData: {} });

        // Calculate the total amount for Razorpay
        const totalAmount = req.body.amount * 100; // Razorpay accepts amount in paisa (INR * 100)

        // Create Razorpay order
        const options = {
            amount: totalAmount,  // amount in the smallest currency unit (paisa)
            currency: "INR",
            receipt: newOrder._id.toString(),  // unique receipt ID for this order
            payment_capture: 1  // automatic payment capture after payment
        };

        // Create the order on Razorpay
        const razorpayOrder = await razorpay.orders.create(options);

        // Send Razorpay order details to the frontend for payment
        res.json({
            success: true,
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            receipt: razorpayOrder.receipt,
            frontendSuccessUrl: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            frontendCancelUrl: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in placing order" });
    }
}

// Verify payment
const verifyPayment = async (req, res) => {
    const {orderId, success} = req.body;

    try {
        if(success === "true") {
            await orderModel.findByIdAndUpdate({ _id: orderId }, { payment: true });
            res.json({ success: true, message: "Payment successful" });
        }else{
            await orderModel.findByIdAndDelete({ _id: orderId });
            res.json({ success: false, message: "Payment failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in verifying payment" });
    }
}

// user orders for front-end
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data : orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in fetching orders" });
    }
}

// Listing all orders for admin panel
const listOrders = async (req, res) => {
    try {
        const order = await orderModel.find({});
        res.json({ success: true, data : order });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in fetching orders" });
    }
}

// API for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate({ _id: req.body.orderId }, { status: req.body.status });
        res.json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in updating order status" });
    }
}

export { placeOrder , verifyPayment , userOrders , listOrders , updateStatus };
