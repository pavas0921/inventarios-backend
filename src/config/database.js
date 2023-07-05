import mongoose from "mongoose";

const connect = async () => {
  const mongoURI =
    process.env.MONGO_URI || "mongodb://localhost:27017/inventariosdb";
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
