import mongoose, { Schema } from "mongoose";
import Owner from "./owner.js";
import Tenant from "./tenant.js";

const propertySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
