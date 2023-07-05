import express from "express";
import { createItem, getAllItem } from "../controllers/item.controller.js";

const router = express.Router();

router.post("/", createItem);
router.get("/", getAllItem);

export default router;
