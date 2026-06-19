const express = require("express");
const pool = require("../config/database");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    const result = await pool.query(
      "SELECT * FROM pokemons"
    );

    res.json(result.rows);

  }
);

module.exports = router;