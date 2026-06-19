import { useState } from "react";

import "./App.css";

import Login from "./components/Login";
import PokemonForm from "./components/PokemonForm";
import PokemonList from "./components/PokemonList";

function App() {

  const [token, setToken] = useState("");
  const [pokemons, setPokemons] = useState([]);

  async function login(username, password) {

    const response = await fetch(
      "http://localhost:3000/auth/login",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username,
          password
        })
      }
    );

    const data = await response.json();

    if(!response.ok){
      alert(data.message);
      return;
    }

    setToken(data.token);

    carregarPokemons(data.token);

  }

  async function carregarPokemons(jwt){

    const response = await fetch(
      "http://localhost:3000/pokemons",
      {
        headers:{
          Authorization:`Bearer ${jwt}`
        }
      }
    );

    const data = await response.json();

    setPokemons(data);

  }

  async function cadastrarPokemon(pokemon){

  const response = await fetch(
    "http://localhost:3000/pokemons",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify(pokemon)
    }
  );

  const data = await response.json();

  if(!response.ok){

    alert(data.message);
    return;

  }

  alert("Pokémon cadastrado com sucesso!");

  carregarPokemons(token);

}

async function excluirPokemon(id){

  const response = await fetch(

    `http://localhost:3000/pokemons/${id}`,

    {

      method:"DELETE",

      headers:{
        Authorization:`Bearer ${token}`
      }

    }

  );

  const data = await response.json();

  if(!response.ok){

    alert(data.message);
    return;

  }

  alert(data.message);

  carregarPokemons(token);

}

  function sair(){

    setToken("");
    setPokemons([]);

  }

  return(

    <div className="app">

      <h1>Pokédex Fullstack</h1>

      {!token && (

        <Login onLogin={login}/>

      )}

      {token && (

        <>

          <div className="topo">

            <h2>Bem-vindo!</h2>

            <button
              className="logout"
              onClick={sair}
            >
              Sair
            </button>

          </div>

          <div className="container">

            <div className="esquerda">

              <PokemonForm
                onCadastrar={cadastrarPokemon}
              />

            </div>

            <div className="direita">

              <PokemonList
                pokemons={pokemons}
                onExcluir={excluirPokemon}
              />

            </div>

          </div>

        </>

      )}

    </div>

  );

}

export default App;