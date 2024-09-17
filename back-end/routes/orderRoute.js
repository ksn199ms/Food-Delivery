import express from 'express'
import { placeOrder, verifyPayment, userOrders, listOrders } from '../controllers/orderController.js'
import authMiddleware from '../middleware/Auth.js';

const orderRouter = express.Router();


orderRouter.post('/place',authMiddleware, placeOrder)
orderRouter.post('/verify', verifyPayment)
orderRouter.post('/userorders',authMiddleware, userOrders)
orderRouter.get('/list',listOrders)


export default orderRouter