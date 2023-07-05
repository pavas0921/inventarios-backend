import Property from "../models/property.js";
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

// Obtener todas las propiedades
export const getAllProperties = async (req, res) => {
  try {
    console.log("hola");
    const item = await Property.find().populate("ownerId").populate("tenantId");

    if (item.length) {
      return res.json({ status: 201, item });
    } else {
      return res.json({ status: 204, message: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las propiedades" });
  }
};

export const getPropertiesByTenantId = async (req, res) => {
  const { tenantId } = req.params;
  console.log(tenantId);

  try {
    const properties = await Property.find({ tenantId });

    if (properties.length) {
      return res.json({ status: 200, properties });
    } else {
      return res.json({ status: 204, message: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las propiedades" });
  }
};

// Crear una propiedad
export const createProperty = async (req, res) => {
  const { address, propertyType, ownerId, tenantId } = req.body;
  try {
    const property = await Property.create({
      address,
      propertyType,
      ownerId,
      tenantId,
    });
    res.status(201).json({ status: 201, property });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
