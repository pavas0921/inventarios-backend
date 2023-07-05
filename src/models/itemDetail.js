import mongoose, { Schema } from "mongoose";

const itemDetailSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});

const itemDetail = mongoose.model("itemDetail", itemDetailSchema);

export default itemDetail;
