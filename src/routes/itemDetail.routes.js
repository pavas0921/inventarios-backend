import express from "express";
import {
  createItemDetail,
  getAllItemDetails,
} from "../controllers/itemDetail.controller.js";

const router = express.Router();

router.post("/", createItemDetail);
router.get("/", getAllItemDetails);

export default router;
