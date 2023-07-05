import inventoryHeader from "../models/inventoryHeader.js";
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

// Crear un nuevo encabezado de inventario
export const createInventoryHeader = async (req, res) => {
  const { propertyId, date, witness } = req.body;
  try {
    const item = await inventoryHeader.create({
      propertyId,
      date,
      witness,
    });
    res.status(201).json({ status: 201, item });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getInventoryHeadersByPropertyId = async (req, res) => {
  const { propertyId } = req.params;
  try {
    const inventoryHeaders = await inventoryHeader.find({ propertyId });
    if (inventoryHeaders.length) {
      return res.json({ status: 201, inventoryHeaders });
    } else {
      return res.json({ status: 204, message: "No content" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los inventoryHeader" });
  }
};
