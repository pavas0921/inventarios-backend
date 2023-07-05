import express from "express";
import {
  createAmbient,
  getAllAmbients,
} from "../controllers/ambient.controller.js";

const router = express.Router();

router.post("/", createAmbient);
router.get("/", getAllAmbients);

export default router;
