import { useState } from "react";

function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function entrar() {

    if (!username || !password) {
      alert("Preencha usuário e senha.");
      return;
    }

    onLogin(username, password);

  }

  return (

    <div className="card">

      <h2>Login</h2>

      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={entrar}>
        Entrar
      </button>

    </div>

  );

}

export default Login;