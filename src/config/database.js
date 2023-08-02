import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config();

const connect = async () => {
  const mongoURI =
    process.env.DB
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(mongoURI, options);
    console.log("Connection established sucessfully");
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export { connect };

