import jwt from "jsonwebtoken";
import Ambient from "../models/ambient.js";

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

// Obtener todos los Ambient
export const getAllAmbients = async (req, res) => {
  try {
    const itemAmbient = await Ambient.find();
    if (itemAmbient.length) {
      return res.json({ status: 201, itemAmbient });
    } else {
      return res.json({ status: 204, message: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los propietarios" });
  }
};

// Crear un nuevo rol
export const createAmbient = async (req, res) => {
  const { ambientName, ambientImg } = req.body;
  try {
    const ambient = await Ambient.create({
      ambientName,
      ambientImg,
    });
    res.status(201).json({ status: 201, ambient });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
