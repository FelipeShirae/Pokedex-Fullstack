const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {

  const { username, password } = req.body;

  // validação dos campos
  if (!username || !password) {
    return res.status(400).json({
      message: "Usuário e senha são obrigatórios"
    });
  }

  const user = await User.findByUsername(username);

  // usuário não existe
  if (!user) {
    console.log("Tentativa de login com usuário inexistente:", username);

    return res.status(401).json({
      message: "Usuário ou senha inválidos"
    });
  }

  const senhaValida = await bcrypt.compare(
    password,
    user.password
  );

  // senha incorreta
  if (!senhaValida) {
    console.log("Senha inválida para usuário:", username);

    return res.status(401).json({
      message: "Usuário ou senha inválidos"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    "segredo123",
    {
      expiresIn: "1h"
    }
  );

  console.log("Login realizado:", username);

  res.json({
    message: "Login OK",
    token
  });

});

module.exports = router;