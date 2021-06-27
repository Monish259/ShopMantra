import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //mongoose.connect will return promise -> await used
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`DB successfully connected to host : ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error}`);
    process.exit(1); //it means exiting func with error status
  }
};

export default connectDB;
