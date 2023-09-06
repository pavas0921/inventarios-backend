import jwt from "jsonwebtoken";
import Tenant from "../models/tenant.js";

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
export const getAllTenants = async (req, res) => {
  try {
    console.log("hola");
    const item = await Tenant.find();
    if (item.length) {
      return res.json({ status: 201, item });
    } else {
      return res.json({ status: 204, message: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los propietarios" });
  }
};

// Crear un nuevo inquilino
export const createTenant = async (req, res) => {
  console.log("hola");
  const { first_name, last_name, cedula, email, address, phone } = req.body;
  try {
    const tenant = await Tenant.create({
      first_name,
      last_name,
      cedula,
      email,
      address,
      phone,
    });
    res.status(201).json({ error: true, status: "success", message: "¡Inquilino registrado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Obtener un rol por su cedula
export const getTenantByCedula = async (req, res) => {
  const { cedula } = req.params;
  console.log("cedula***", cedula);
  try {
    const tenant = await Tenant.find({ cedula: cedula });
    if (!tenant) {
      return res.status(404).json({ error: "Inquilino no encontrado" });
    }
    res.json(tenant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener el inquilino" });
  }
};

// Actualizar un usuario por su cedula
export const updateTenant = async (req, res) => {
  const { cedula } = req.params;
  const { first_name, last_name, email, address, phone } = req.body;
  try {
    const tenant = await Tenant.findOneAndUpdate(
      { cedula: cedula },
      { first_name, last_name, email, address, phone },
      { new: true }
    );
    if (!tenant) {
      return res
        .status(404)
        .json({ error: "Inquilino no encontrado no encontrado" });
    }
    res.json(tenant);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Eliminar un rol por su cedula
export const deleteTenant = async (req, res) => {
  const { cedula } = req.params;
  try {
    const tenant = await Tenant.findOneAndDelete({ cedula: cedula });
    if (!tenant) {
      return res.status(404).json({ error: "Inquilino no encontrado" });
    }
    res.json({ message: "Inquilino eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Propietario" });
  }
};
