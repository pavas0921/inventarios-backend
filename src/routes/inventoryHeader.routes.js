import express from "express";
import {
  createInventoryHeader,
  getInventoryHeadersByPropertyId,
} from "../controllers/inventoryHeader.controller.js";
import Property from "../models/property.js";

const router = express.Router();

router.post("/", createInventoryHeader);

router.get("/:propertyId", getInventoryHeadersByPropertyId);

export default router;
