const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {

  const { username, password } = req.body;

  const user = await User.findByUsername(username);

  console.log("Usuário encontrado:");
  console.log(user);

  const senhaValida = await bcrypt.compare(
    password,
    user.password
  );

  console.log("Senha digitada:", password);
  console.log("Hash banco:", user.password);
  console.log("Resultado bcrypt:", senhaValida);

  if (!senhaValida) {
    return res.status(401).json({
      message: "Senha inválida"
    });
  }

  res.json({
    message: "Login OK"
  });

});

module.exports = router;