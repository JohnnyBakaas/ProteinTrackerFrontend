import { useEffect, useState } from "react";
import "./App.css";
import NotLoggedIn from "./Components/NotLoggedIn";
import MainScrean from "./Components/MainScrean";
import Loading from "./Components/Loading";

// Hvis server ikke er oppe kommer vi fortsatt til login... ikke bra

const validateToken = (token) => {
  return fetch(`https://localhost:7168/user?tokenFromClient=${token}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((user) => user.value != "Ugyldig");
};

const App = () => {
  const [hasValidToken, setHasValidToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
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
    return <Loading />;
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
      <MainScrean />
    </div>
  );
};

export default App;

// .env fil sjekk
