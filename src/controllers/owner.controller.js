import Owner from "../models/owner.js";
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

// Obtener todos los owner
export const getAllOwners = async (req, res) => {
  try {
    console.log("hola");
    const item = await Owner.find();
    if (item.length) {
      return res.json({ status: 201, item });
    } else {
      return res.json({ status: 204, message: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los propietarios" });
  }
};

// Crear un nuevo rol
export const createOwner = async (req, res) => {
  console.log("hola");
  const { first_name, last_name, cedula, email, address, phone } = req.body;
  try {
    const owner = await Owner.create({
      first_name,
      last_name,
      cedula,
      email,
      address,
      phone,
    });
    res.status(201).json({ status: 201, owner });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Obtener un rol por su cedula
export const getOwnerByCedula = async (req, res) => {
  const { cedula } = req.params;
  console.log(cedula);
  try {
    const owner = await Owner.find({ cedula: cedula });
    if (!owner) {
      return res.status(404).json({ error: "Propietario no encontrado" });
    }
    res.json(owner);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener el propietario" });
  }
};

// Actualizar un usuario por su cedula
export const updateOwner = async (req, res) => {
  const { cedula } = req.params;
  const { first_name, last_name, email, address, phone } = req.body;
  try {
    const owner = await Owner.findOneAndUpdate(
      { cedula: cedula },
      { first_name, last_name, email, address, phone },
      { new: true }
    );
    if (!owner) {
      return res
        .status(404)
        .json({ error: "Prpietario no encontrado no encontrado" });
    }
    res.json(owner);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Eliminar un rol por su cedula
export const deleteOwner = async (req, res) => {
  const { cedula } = req.params;
  try {
    const owner = await Owner.findOneAndDelete({ cedula: cedula });
    if (!owner) {
      return res.status(404).json({ error: "Propietario no encontrado" });
    }
    res.json({ message: "Propietario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Propietario" });
  }
};
