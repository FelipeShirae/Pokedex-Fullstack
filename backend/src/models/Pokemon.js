const pool = require("../config/database");

class Pokemon {

  static async getAll() {
    const result = await pool.query(
      "SELECT * FROM pokemons"
    );

    return result.rows;
  }

  static async create(nome, tipo, altura, peso) {

    const result = await pool.query(
      `
      INSERT INTO pokemons
      (nome, tipo, altura, peso)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [nome, tipo, altura, peso]
    );

    return result.rows[0];
  }
}

module.exports = Pokemon;