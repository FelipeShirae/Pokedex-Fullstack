const express = require("express");
const pool = require("./config/database");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", async (req, res) => {

  const result = await pool.query(
    "SELECT NOW()"
  );

  res.json(result.rows);

});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});