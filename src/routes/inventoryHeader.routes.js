import express from "express";
import {
  createInventoryHeader,
  getInventoryHeaders,
  getInventoryHeadersByPropertyId
} from "../controllers/inventoryHeader.controller.js";

const router = express.Router();

router.post("/", createInventoryHeader);

router.get("/", getInventoryHeaders);

router.get("/:propertyId", getInventoryHeadersByPropertyId);

export default router;
