import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { cors } from './middlewares/cors.js'
import connectMongodb from './utils/db-connection.js'

import clinicRoutes from './routes/clinic.js'
import userRoutes from './routes/user.js'
import documentRoutes from './routes/document.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001

connectMongodb()

// const corsOptions = {
//   origin: process.env.CORS_ORIGIN,
//   credentials: true,
//   methods: process.env.CORS_METHOD,
//   allowedHeaders:["Content-Type", "Authorization"]
// }

// app.use(cors(corsOptions));

const cors = (req,res,next) =>{
        res.setHeader('Access-Control-Allow-Origin','https://procohat-frontend-plum.vercel.app');
        res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
        res.setHeader('Access-Control-Allow-Headers','Content-Type');
        res.setHeader('Access-Control-Allow-Credentials',true);
        next();
}

app.use(cors);
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api/clinic', clinicRoutes)
app.use('/api/user', userRoutes)
app.use('/api/document', documentRoutes)

app.listen(PORT, () => console.log(`Server is listing on port ${PORT}`))