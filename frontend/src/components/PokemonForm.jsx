import { useState } from "react";
import pokeApi from "../services/pokeApi";

function PokemonForm({ onCadastrar }) {

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [imagem, setImagem] = useState("");

  async function buscarPokemon() {

    if (!nome) {
      alert("Digite o nome do Pokémon.");
      return;
    }

    try {

      const response = await pokeApi.get(
        `/pokemon/${nome.toLowerCase()}`
      );

      const pokemon = response.data;

      setNome(pokemon.name);
      setTipo(
        pokemon.types
          .map((t) => t.type.name)
          .join(", ")
      );
      setAltura(pokemon.height);
      setPeso(pokemon.weight);
      setImagem(pokemon.sprites.front_default);

    } catch {

      alert("Pokémon não encontrado.");

    }

  }

  function cadastrar() {

    if (!nome || !tipo || !altura || !peso) {
      alert("Busque um Pokémon antes de cadastrar.");
      return;
    }

    onCadastrar({
      nome,
      tipo,
      altura,
      peso,
      imagem
    });

    setNome("");
    setTipo("");
    setAltura("");
    setPeso("");
    setImagem("");

  }

  return (

    <div className="card">

      <h2>Novo Pokémon</h2>

      <input
        placeholder="Digite o nome (Ex: pikachu)"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <br /><br />

      <button onClick={buscarPokemon}>
        Buscar na PokéAPI
      </button>

      <br /><br />

      {imagem && (
        <img
          src={imagem}
          alt={nome}
          width="120"
        />
      )}

      <br />

      <input
        placeholder="Tipo"
        value={tipo}
        readOnly
      />

      <input
        placeholder="Altura"
        value={altura}
        readOnly
      />

      <input
        placeholder="Peso"
        value={peso}
        readOnly
      />

      <br /><br />

      <button onClick={cadastrar}>
        Cadastrar Pokémon
      </button>

    </div>

  );

}

export default PokemonForm;