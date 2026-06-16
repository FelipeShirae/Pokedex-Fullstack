const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pokedex_fullstack",
  password: "1111",
  port: 5432,
  max: 10
});

module.exports = pool;