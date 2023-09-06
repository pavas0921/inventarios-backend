import jwt from "jsonwebtoken";
export const generateToken = (req, res) => {
  try {
    const { user } = req.body;
    const payload = {
      iduser: user._id,
      name: user.first_name,
      lastname: user.last_name,
      email: user.email,
      token: null,
      role: user.idrole,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    payload.token = token;
    res.status(200).json({ status: 200, data: payload });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};
