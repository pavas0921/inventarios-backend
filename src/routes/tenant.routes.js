import express from "express";
import {
  createTenant,
  getAllTenants,
  getTenantByCedula,
  updateTenant,
  deleteTenant,
} from "../controllers/tentant.controlles.js";

const router = express.Router();

//create role
router.post("/", createTenant);
router.get("/", getAllTenants);
router.get("/:cedula", getTenantByCedula);
router.put("/:cedula", updateTenant);
router.delete("/:cedula", deleteTenant);

export default router;
