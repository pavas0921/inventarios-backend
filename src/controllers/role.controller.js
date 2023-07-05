import Role from "../models/role.js";

// Obtener todos los roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    if (roles.length) return res.json({ status: 201, roles });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los roles" });
  }
};

// Crear un nuevo rol
export const createRole = async (req, res) => {
  console.log("create role");
  const { roleName, roleDescription } = req.body;
  console.log(roleName);
  try {
    const role = await Role.create({ roleName, roleDescription });
    res.status(201).json(role);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// Obtener un rol por su ID
export const getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el rol" });
  }
};

// Actualizar un rol por su ID
export const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const role = await Role.findByIdAndUpdate(id, { name }, { new: true });
    if (!role) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.json(role);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// Eliminar un rol por su ID
export const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByIdAndDelete(id);
    if (!role) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.json({ message: "Rol eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el rol" });
  }
};
