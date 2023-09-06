import jwt from "jsonwebtoken";
import inventoryHeader from "../models/inventoryHeader.js";

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;

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
    res.status(201).json({ error: true, status: "success", message: "Inventario registrado con éxito" });
    
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

export const getInventoryHeaders = async (req, res) => {
  //const { propertyId } = req.params;
  try {
    const inventoryHeaders = await inventoryHeader.find()
    .populate({
      path: "propertyId",
      model: "Property",
      populate: [
        { path: 'ownerId', model: 'Owner' },
        { path: 'tenantId', model: 'Tenant' }
      ]
    })
    .sort({date: 1})
   
    if (inventoryHeaders.length > 0) {
      return res.json({ status: 201, inventoryHeaders });
    } else {
      return res.json({ status: 204, message: "No content" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los inventoryHeader" });
  }
};
