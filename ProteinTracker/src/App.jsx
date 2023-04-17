import { useEffect, useState } from "react";
import "./App.css";
import NotLoggedIn from "./Components/NotLoggedIn";

// Hvis server ikke er oppe kommer vi fortsatt til login... ikke bra

const validateToken = (token) => {
  console.log("Hei");
  return fetch("https://localhost:7168/user", {
    method: "GET",
    headers: {
      tokenFromClient: token,
    },
  })
    .then((response) => response.json())
    .then((user) => !!user); // Convert truthy/falsy values to boolean
};

const App = () => {
  const [hasValidToken, setHasValidToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    console.log(sessionToken);
    if (sessionToken) {
      setLoading(true);
      validateToken(sessionToken)
        .then((isValid) => {
          setHasValidToken(isValid);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setHasValidToken(false);
          setLoading(false);
        });
    } else {
      setHasValidToken(false);
      setLoading(false);
    }
  }, [localStorage.getItem("sessionToken")]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasValidToken) {
    return (
      <div>
        <NotLoggedIn />
      </div>
    );
  }

  return (
    <div>
      <h2>Kake</h2>
    </div>
  );
};

export default App;

// .env fil sjekk
