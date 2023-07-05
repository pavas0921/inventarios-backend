import mongoose, { Schema } from "mongoose";

const ambientSchema = new mongoose.Schema({
  ambientName: {
    type: String,
    required: true,
  },
  ambientImg: {
    type: String,
    required: true,
  },
});

const Ambient = mongoose.model("Ambient", ambientSchema);

export default Ambient;
