// backend/server.js
const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config({ path: path.join(__dirname, ".env") });

// Middlewares
app.use(express.json());

const userRoutes = require("./routes/user");
app.use("/users", userRoutes);   // => /users


// Healthcheck cho dễ test
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

/* Hook routes chính (để chỗ sẵn, sẽ thêm sau)
const apiRouter = require("./routes");
app.use("/api", apiRouter);
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
