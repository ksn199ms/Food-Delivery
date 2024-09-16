// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";

// import Razorpay from "razorpay";

// const razorpay = new Razorpay(process.env.RAZOR_PAY_SECRET_KEY);


// // placing user order from front-end
// const placeOrder = async (req, res) => {

//     const frontend_url = 'http://localhost:5173';


//     try {
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address
//         });
//         await newOrder.save();
//         await userModel.findByIdAndUpdate({ _id: req.body.userId }, { cartData: {} });

//         const line_items = req.body.items.map((item) => ({
//             price_data:{
//                 currency: "INR",
//                 product_data: {
//                     name: item.name
//                 },
//                 unit_amount: item.price * 100 * 80
//             },
//             quantity: item.quantity
//         }));

//         line_items.push({
//             price_data:{
//                 currency: "INR",
//                 product_data: {
//                     name: "Delivery Charge"
//                 },
//                 unit_amount: 2 * 100 * 80
//             },
//             quantity: 1
//         });

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: line_items,
//             mode: "payment",
//             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}` 
//         });

//         res.json({success: true, session_url: session.url});
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: "error"});
//     }
// }

// export { placeOrder }


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


    const frontend_url = 'http://localhost:5173';

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

export { placeOrder };
