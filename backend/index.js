import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import itemRouter from './routes/itemRouter.js';
import orderRouter from './routes/orderRouter.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api/user', userRouter);
app.use('/api/item', itemRouter);
app.use('/api/order', orderRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;


// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';
// import userRouter from './routes/userRouter.js';
// import itemRouter from './routes/itemRouter.js';
// import orderRouter from './routes/orderRouter.js';
// import cors from 'cors';
// import { Server } from 'socket.io';
// import http from 'http';

// const app = express();
// dotenv.config();
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   },
// });

// mongoose.connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log("Connected to Database");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.use('/api/user', userRouter);
// app.use('/api/item', itemRouter);
// app.use('/api/order', orderRouter);

// app.use((err, req, res, next) => {
//   const statuscode = err.statusCode || 500;
//   const message = err.message || 'Internal server error';
//   return res.status(statuscode).json({
//     success: false,
//     statuscode,
//     message,
//   });
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });

// export { io,app };
