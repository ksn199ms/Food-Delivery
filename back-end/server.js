import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'


// app config
const app = express()
const port = process.env.PORT || 4000


// middlewares
app.use(express.json())
app.use(cors())


dotenv.config()


// db config
connectDB();


// api endpoints
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)


// routes
app.get('/', (req, res) => {
    res.send('API Working')
})



// listen
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})
