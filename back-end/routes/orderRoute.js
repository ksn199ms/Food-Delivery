import express from 'express'
import { placeOrder, verifyPayment, userOrders } from '../controllers/orderController.js'
import authMiddleware from '../middleware/Auth.js';

const orderRouter = express.Router();


orderRouter.post('/place',authMiddleware, placeOrder)
orderRouter.post('/verify', verifyPayment)
orderRouter.post('/userorders',authMiddleware, userOrders)


export default orderRouter