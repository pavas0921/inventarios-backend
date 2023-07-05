import mongoose, { Schema } from "mongoose";

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
  },
  roleDescription: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
