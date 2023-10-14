import express from 'express'
import connectDB from "./db/connect.js"
import 'dotenv/config'
import cors from 'cors'
import { createServer } from 'http';

import userRouter from './routes/userRoutes.js'
import carRouter from './routes/carRoutes.js'
import insuranceRouter from './routes/insuranceRoutes.js'
import offerRouter from './routes/offersRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import { Server } from 'socket.io'
import { approval } from './sockets/approval.js'
import { pathURL } from './utils.js';

const app = express()
app.use(express.json())

app.use(cors())
app.use("/uploads", express.static('uploads'))


app.use('/api/v1/user', userRouter)
app.use('/api/v1/car', carRouter)
app.use('/api/v1/insurance', insuranceRouter)
app.use('/api/v1/offer', offerRouter)
app.use('/api/v1/order', orderRouter)


const port = process.env.PORT || 8000

// // socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: pathURL,
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    }
});

approval(io)
// //end

const start = async () => {

    try {
        connectDB(process.env.MONGO_URI)
        httpServer.listen(port, () => {
            console.log(
                `Server is listening on port ${port}...`
            );
        })

    } catch (error) {
        console.log(error);
    }
}

start()