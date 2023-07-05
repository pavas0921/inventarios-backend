import express from "express";
import {
  createOwner,
  getAllOwners,
  getOwnerByCedula,
  updateOwner,
  deleteOwner,
} from "../controllers/owner.controller.js";

const router = express.Router();

//create role
router.post("/", createOwner);
router.get("/", getAllOwners);
router.get("/:cedula", getOwnerByCedula);
router.put("/:cedula", updateOwner);
router.delete("/:cedula", deleteOwner);

export default router;
