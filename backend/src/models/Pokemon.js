const pool = require("../config/database");

class Pokemon {

  static async getAll() {

    const result = await pool.query(
      "SELECT * FROM pokemons ORDER BY id"
    );

    return result.rows;
  }

  static async findByName(nome) {

    const result = await pool.query(
      "SELECT * FROM pokemons WHERE LOWER(nome) LIKE LOWER($1)",
      [`%${nome}%`]
    );

    return result.rows;
  }

}

module.exports = Pokemon;