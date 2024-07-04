import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import itemRouter from './routes/itemRouter.js';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.listen(3000,()=>{
    console.log("Listening on port 3000");
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Connected to Database");
    }).catch((err)=>{
        console.log(err);
    });
})

app.use('/api/user',userRouter);
app.use('/api/item',itemRouter);


app.use((err,req,res,next)=>{
    const statuscode=err.statusCode||500;
    const message=err.message||'Internal server error';
    return res.status(statuscode).json({
        success:false,
        statuscode,
        message, 
    })
})
