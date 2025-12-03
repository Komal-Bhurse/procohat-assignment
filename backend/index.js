import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
// import { cors } from './middlewares/cors.js'
import connectMongodb from './utils/db-connection.js'

import clinicRoutes from './routes/clinic.js'
import userRoutes from './routes/user.js'
import documentRoutes from './routes/document.js'

import cors from "cors";

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

// function cors(req,res,next){
//         res.setHeader('Access-Control-Allow-Origin','https://procohat-frontend-plum.vercel.app');
//         res.setHeader('Access-Control-Allow-Methods','OPTIONS,HEAD,GET,POST,PUT,PATCH,DELETE');
//         res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization,');
//         res.setHeader('Access-Control-Allow-Credentials',true);
//         next();
// }

// cors()

app.use(cors({
  origin: "https://procohat-frontend-plum.vercel.app",
  credentials: true,
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
}));

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api/clinic', clinicRoutes)
app.use('/api/user', userRoutes)
app.use('/api/document', documentRoutes)

app.listen(PORT, () => console.log(`Server is listing on port ${PORT}`))