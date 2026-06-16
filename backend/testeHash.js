const bcrypt = require("bcrypt");

async function teste() {

  const senha = "123456";

  const hash = await bcrypt.hash(senha, 10);

  console.log("HASH:");
  console.log(hash);

  const resultado = await bcrypt.compare(
    senha,
    hash
  );

  console.log("COMPARE:", resultado);

}

teste();