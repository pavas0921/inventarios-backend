import Item from "../models/item.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CONFIG from "../config/config.js";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);
    const { exp: expDate } = decoded;

    //Expired?
    if (Date.now() / 1000 > expDate) {
      console.log("expired");
      res.status(401).send();
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("no");
  }
};

// Crear un nuevo rolitem
export const createItem = async (req, res) => {
  const { itemName } = req.body;
  console.log(itemName);
  try {
    const item = await Item.create({
      itemName,
    });
    res.status(201).json({ status: 201, item });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getAllItem = async (req, res) => {
  try {
    const item = await Item.find();
    if (item.length) {
      return res.json({ status: 201, item });
    } else {
      return res.json({ status: 204, message: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los propietarios" });
  }
};
