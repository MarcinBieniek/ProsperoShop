import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import productRouter from './routes/product.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// server setup
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Mongo db error is', err)
})

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/product", productRouter);

// error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})