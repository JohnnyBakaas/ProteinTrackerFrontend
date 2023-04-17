import React, { useState } from "react";
import App from "../App";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sucsesfullLogedin, setSucsesfullLogedin] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission, e.g. send data to server
    fetch(
      `https://localhost:7168/login?userName=${username}&password=${password}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((token) => {
        try {
          if (token.value.tokenString) {
            localStorage.setItem("sessionToken", token.value.tokenString);
            setSucsesfullLogedin(true);
          }
        } catch {
          console.log("Feil bruker navn eller passord");
        }
      });
  };

  if (sucsesfullLogedin) return <App />;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={handleUsernameChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />

      <button type="submit">Logg inn</button>
    </form>
  );
};

export default LoginPage;
