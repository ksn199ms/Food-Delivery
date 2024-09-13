import express from 'express'
import cors from 'cors'


// app config
const app = express()
const port = 4000


// middlewares
app.use(express.json())
app.use(cors())


// routes
app.get('/', (req, res) => {
    res.send('API Working')
})



// listen
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})
