import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);

      req.user = await User.findById(decoded.id).select('-password');
      // here we are adding user to req object which we can access anytime while user is logged in
      // .select is used to exclude password frmo result set

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized !!');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized !!');
  }
});

export default protect;
