import jwt from "jsonwebtoken";
import InventoryDetail from "../models/inventoryDetail.js";

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

// Crear un nuevo detalle de inventario
export const createInventoryDetail = async (req, res) => {
  const { inventoryId, inventoryDetail } = req.body;
  console.log(req.body);
  try {
    const newInventoryDetail = await InventoryDetail.create({
      inventoryId,
      inventoryDetails: inventoryDetail,
    });
    res.status(201).json({ status: 201, inventoryDetail: newInventoryDetail });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const getAllInvetoryDetails = async (req, res) => {
  try {
     const item = await InventoryDetail.find()
      .populate({
        path: "inventoryId",
        model: "inventoryHeader",
        populate: { path: "propertyId", model: "Property", select: "address" },
      })
      .populate({
        path: "inventoryDetails.ambientId",
        model: "Ambient",
      })
      .populate({ path: "inventoryDetails.itemId", model: "Item" })
      .populate({ path: "inventoryDetails.itemDetailId", model: "itemDetail" })
      .exec();

    /*const item = await InventoryDetail.find().populate({
      path: "inventoryDetails.ambientId",
      model: "Ambient",
    });*/

    if (item.length) {
      return res.json({ status: 201, item });
    } else {
      return res.json({ status: 204, message: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los propietarios" });
  }
};
