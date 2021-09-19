import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//  @desc       login user
//  @route      POST /api/users/login
//  @access     public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); // returns promise
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    //authentication error

    res.status(401);
    throw new Error('Invalid Email or Password'); //asyncHandler will make sure this will be going to custom errorHandler functions
  }
});

//  @desc       fetch user profile
//  @route      GET /api/users/profile
//  @access     private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); //user is set in req in protect middleware
  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found !!');
  }
});

//  @desc       register user
//  @route      POST /api/users
//  @access     public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email }); // returns promise

  if (userExists) {
    res.status(400);
    throw new Error(
      'Email already exists !! please login or use other Email ID'
    );
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid details entered');
    }
  }
});

//  @desc       update user
//  @route      PUT /api/users/profile
//  @access     private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // finding user in db using user object from req which is saved in protect route

  if (user) {
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;

    try {
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: updatedUser.token,
      });
    } catch (error) {
      res.status(400);
      throw new Error('Failed to update the user !!');
    }
  } else {
    res.status(404);
    throw new Error('User Not Found !!');
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
