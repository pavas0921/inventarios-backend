import mongoose, { Schema } from "mongoose";
import Property from "./property.js";
import Ambient from "./ambient.js";
import Item from "./item.js";

const inventoryHeaderSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
  witness: {
    type: String,
    required: true,
  },
});

const inventoryHeader = mongoose.model(
  "inventoryHeader",
  inventoryHeaderSchema
);

export default inventoryHeader;
