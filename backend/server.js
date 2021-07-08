import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'; //need to add .js if importing files in node using ES syntax
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import morgan from 'morgan';
const app = express();

app.use(express.json()); // required to parse json body from req.body

dotenv.config();

connectDB();

app.use(morgan('dev')); //used to record which link is hit
app.use('/api/products', productRoutes); //any request to /api/products will go to productRoutes and check api defined
app.use('/api/users', userRoutes); //any request to /api/products will go to productRoutes and check api defined
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `connected to ${process.env.NODE_ENV} server and listening to port ${process.env.PORT}`
  )
);
