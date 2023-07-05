import mongoose, { Schema } from "mongoose";
import inventoryHeader from "./inventoryHeader.js";
import Ambient from "./ambient.js";
import Item from "./item.js";
import itemDetail from "./itemDetail.js";

const inventoryDetailSchema = new mongoose.Schema({
  inventoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "inventoryHeader",
    required: true,
  },

  inventoryDetail: [
    {
      ambientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ambient",
        required: true,
      },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      itemDetailId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "itemDetail",
        required: true,
      },
    },
  ],
});

const inventoryDetail = mongoose.model(
  "inventoryDetail",
  inventoryDetailSchema
);

export default inventoryDetail;
