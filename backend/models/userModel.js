import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
); //using timestamps: true argument created on and updated on will be autocreated and handeled by mongoose

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  //this will run before whenever we save on user model anywhere
  if (!this.isModified('password')) next(); //when pwd is not modified then this pre func will not run
  //await reqd as it ll be returning promise
  const salt = await bcrypt.genSalt(10); //generating salt to hash plain pwd to store in mongoDB
  this.password = await bcrypt.hash(this.password, salt); //password entered by end user will be hashed and saved to db
});

const User = mongoose.model('User', userSchema);
export default User;
