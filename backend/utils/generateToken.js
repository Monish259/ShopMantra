import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //used to generate jwt token using user id which expires in 1 hour
    expiresIn: '1h',
  });
};

export default generateToken;
