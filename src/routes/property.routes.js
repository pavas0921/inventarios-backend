import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertiesByTenantId,
} from "../controllers/property.controller.js";

const router = express.Router();

router.post("/", createProperty);
router.get("/", getAllProperties);
router.get("/tenant/:tenantId", getPropertiesByTenantId);

export default router;
