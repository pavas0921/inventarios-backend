import express from "express";
import {
  createUser,
  deleteuser,
  getAllUsers,
  login,
  updateuser
} from "../controllers/user.controller.js";

import { generateToken } from "../helpers/generateToken.js";

const router = express.Router();

//create role
router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", updateuser);
router.put("/:id", deleteuser);
router.delete("/:id", deleteuser);
router.post("/login", login, generateToken);

export default router;
