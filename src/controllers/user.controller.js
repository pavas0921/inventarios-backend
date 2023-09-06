import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CONFIG from "../config/config.js";
import User from "../models/user.js";

// Constantes para códigos de estado HTTP
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;

export const generateToken = (req, res) => {
  try {
    console.log("reqq***", req.body.user);
    const { user } = req.body;
    const { _id } = user;
    console.log("id***", _id);
    const payload = { _id };
    console.log("payload**", payload);
    const token = jwt.sign(payload, CONFIG.SECRET, { expiresIn: "1h" });
    res.status(200).json({ _id, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(user && bcrypt.compareSync(password, user.password)){
      req.body.user = user;
      console.log(req.body.user)
      next();
    }
    else{
      return res.status(HTTP_NOT_FOUND).json({ error: true, status: "error", message: "Nombre de usuario y/o contraseña incorrecta." });
    }  
  } catch (error) {
    console.log(error);
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: true });
  }
};

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

// Obtener todos los user
export const getAllUsers = async (req, res) => {
  try {
    const item = await User.find();
    if (item.length) return res.json({ status: 201, item });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los user" });
  }
};

// Crear un nuevo rol
export const createUser = async (req, res) => {
  const { first_name, last_name, email, password, idrole } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  try {
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hash,
      idrole,
    });
    res.status(201).json({ status: 201, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Obtener un rol por su ID
export const getuserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Actualizar un usuario por su ID
export const updateuser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, password, role },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// Eliminar un rol por su ID
export const deleteuser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
