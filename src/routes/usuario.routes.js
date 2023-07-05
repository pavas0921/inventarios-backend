import express from "express";
import {
  createUser,
  getAllUsers,
  getuserById,
  updateuser,
  deleteuser,
  login,
  generateToken,
} from "../controllers/user.controller.js";

const router = express.Router();

//create role
router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", updateuser);
router.put("/:id", deleteuser);
router.delete("/:id", deleteuser);
router.post("/login", login, generateToken);

export default router;
