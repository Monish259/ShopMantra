import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';
dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const createdusers = await User.insertMany(users);
    const adminuser = createdusers[0]._id;

    const sampleData = products.map((p) => {
      return { ...p, user: adminuser };
    });

    await Product.insertMany(sampleData);

    console.log('Data Imported');
    process.exit();
  } catch (error) {
    console.log(`ERROR : ${error}`);
    process.exit(1);
  }
};

importData();
