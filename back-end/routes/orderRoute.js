import express from 'express'
import { placeOrder, verifyPayment} from '../controllers/orderController.js'
import authMiddleware from '../middleware/Auth.js';

const orderRouter = express.Router();


orderRouter.post('/place',authMiddleware, placeOrder)
orderRouter.post('/verify', verifyPayment)


export default orderRouter