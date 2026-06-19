import { useState } from "react";

function PokemonList({ pokemons, onExcluir }) {

  const [busca, setBusca] = useState("");

  const filtrados = pokemons.filter((pokemon) =>
    pokemon.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function excluir(id, nome) {

    const confirmar = window.confirm(
      `Deseja excluir ${nome}?`
    );

    if (confirmar) {
      onExcluir(id);
    }

  }

  return (

    <div className="card">

      <h2>Pokédex</h2>

      <input
        placeholder="Buscar Pokémon..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {filtrados.length === 0 ? (

        <p>Nenhum Pokémon encontrado.</p>

      ) : (

        filtrados.map((pokemon) => (

          <div
            className="pokemon-card"
            key={pokemon.id}
          >

            <h3>{pokemon.nome}</h3>

            <p><strong>Tipo:</strong> {pokemon.tipo}</p>

            <p><strong>Altura:</strong> {pokemon.altura}</p>

            <p><strong>Peso:</strong> {pokemon.peso}</p>

            <button
              onClick={() => excluir(pokemon.id, pokemon.nome)}
            >
              Excluir
            </button>

          </div>

        ))

      )}

    </div>

  );

}

export default PokemonList;