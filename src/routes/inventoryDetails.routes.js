import express from "express";
import {
  createInventoryDetail,
  getAllInvetoryDetails,
} from "../controllers/inventoryDetail.controller.js";

const router = express.Router();

router.post("/", createInventoryDetail);
router.get("/", getAllInvetoryDetails);
export default router;
