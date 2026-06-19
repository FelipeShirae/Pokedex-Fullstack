import { useState } from "react";

function PokemonForm({ onCadastrar }) {

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");

  function cadastrar() {

    if (!nome || !tipo || !altura || !peso) {
      alert("Preencha todos os campos.");
      return;
    }

    onCadastrar({
      nome,
      tipo,
      altura,
      peso
    });

    setNome("");
    setTipo("");
    setAltura("");
    setPeso("");

  }

  return (

    <div className="card">

      <h2>Novo Pokémon</h2>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />

      <input
        placeholder="Altura"
        value={altura}
        onChange={(e) => setAltura(e.target.value)}
      />

      <input
        placeholder="Peso"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
      />

      <button onClick={cadastrar}>
        Cadastrar Pokémon
      </button>

    </div>

  );

}

export default PokemonForm;