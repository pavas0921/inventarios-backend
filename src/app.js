import cors from "cors";
import express from "express";
import { connect } from "./config/database.js";
import ambientRoutes from "./routes/ambient.routes.js";
import inventoryDetail from "./routes/inventoryDetails.routes.js";
import inventoryHeader from "./routes/inventoryHeader.routes.js";
import itemRoutes from "./routes/item.routes.js";
import itemDetailRoutes from "./routes/itemDetail.routes.js";
import ownersRoutes from "./routes/owner.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import roleRoutes from "./routes/role.routes.js";
import tenantsRoutes from "./routes/tenant.routes.js";
import userRoutes from "./routes/usuario.routes.js";

const app = express();
app.use(cors());

//Middleware
app.use(express.json());
connect();

app.get("/", (req, res) => {
  res.json("funcion");
});

app.use("/role", roleRoutes);
app.use("/user", userRoutes);
app.use("/owner", ownersRoutes);
app.use("/tenant", tenantsRoutes);
app.use("/property", propertyRoutes);
app.use("/ambient", ambientRoutes);
app.use("/item", itemRoutes);
app.use("/itemDetail", itemDetailRoutes);
app.use("/inventoryHeader", inventoryHeader);
app.use("/inventoryDetail", inventoryDetail);

export default app;
