import app from "./app.js";
import CONFIG from "./config/config.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(PORT);
});
