const express = require("express");
const pool = require("../config/database");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// LISTAR TODOS
router.get("/", authMiddleware, async (req, res) => {

  const result = await pool.query(
    "SELECT * FROM pokemons ORDER BY id"
  );

  res.json(result.rows);

});


// BUSCAR POR ID
router.get("/:id", authMiddleware, async (req, res) => {

  const { id } = req.params;

  const result = await pool.query(
    "SELECT * FROM pokemons WHERE id = $1",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      message: "Pokémon não encontrado."
    });
  }

  res.json(result.rows[0]);

});


// CADASTRAR
router.post("/", authMiddleware, async (req, res) => {

  const { nome, tipo, altura, peso } = req.body;

  if (!nome || nome.trim() === "") {
    return res.status(400).json({
      message: "Nome é obrigatório."
    });
  }

  if (!tipo || tipo.trim() === "") {
    return res.status(400).json({
      message: "Tipo é obrigatório."
    });
  }

  if (!altura || isNaN(altura)) {
    return res.status(400).json({
      message: "Altura deve ser um número."
    });
  }

  if (!peso || isNaN(peso)) {
    return res.status(400).json({
      message: "Peso deve ser um número."
    });
  }

  const result = await pool.query(

    `INSERT INTO pokemons
    (nome,tipo,altura,peso)
    VALUES($1,$2,$3,$4)
    RETURNING *`,

    [nome, tipo, altura, peso]

  );

  res.status(201).json(result.rows[0]);

});


// ATUALIZAR
router.put("/:id", authMiddleware, async (req, res) => {

  const { id } = req.params;
  const { nome, tipo, altura, peso } = req.body;

  if (!nome || !tipo || !altura || !peso) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios."
    });
  }

  const result = await pool.query(

    `UPDATE pokemons
     SET nome=$1,
         tipo=$2,
         altura=$3,
         peso=$4
     WHERE id=$5
     RETURNING *`,

    [nome, tipo, altura, peso, id]

  );

  if (result.rows.length === 0) {

    return res.status(404).json({
      message: "Pokémon não encontrado."
    });

  }

  res.json(result.rows[0]);

});


// DELETAR
router.delete("/:id", authMiddleware, async (req, res) => {

  const { id } = req.params;

  const result = await pool.query(

    "DELETE FROM pokemons WHERE id=$1 RETURNING *",

    [id]

  );

  if (result.rows.length === 0) {

    return res.status(404).json({
      message: "Pokémon não encontrado."
    });

  }

  res.json({
    message: "Pokémon removido com sucesso."
  });

});

module.exports = router;