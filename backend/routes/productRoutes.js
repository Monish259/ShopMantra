import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
const router = express.Router();

//  @desc       fetch all products
//  @route      GET /api/products
//  @access     public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({}); //returns promise so async await is used

    res.json(products);
  })
);

//  @desc       fetch single product
//  @route      GET /api/products/:id
//  @access     public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id); //returns promise so async await is used

    if (product) res.json(product);
    else {
      res.status(404);
      throw new Error('Product Not Found');
    }
  })
);

export default router;
